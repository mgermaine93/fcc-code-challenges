'use strict';

const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require("mongodb")
const MONGO_URL= process.env.MONGO_URL;
// const { MongoClient } = require('mongodb');

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("issue-tracker");
const issues = database.collection("issues");
const projects = database.collection("projects");

const Issue = require("../models").Issue;
const Project = require("../models").Project;


module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async (req, res) => {

      const projectName = req.params.project;

      // try to find a the appropriate project
      const project = await projects.findOne({name: projectName});
      if (!project) {
        res.json({
          error: "No project found!"
        });
        return;
      } else {

        // gets the stuff in the URL
        let queryObject = req.query

        if (queryObject["open"]) {
          let openBool = queryObject["open"].toLowerCase();
          let openBoolValue = (openBool === "true");
          queryObject["open"] = openBoolValue;
        }

        console.log(`Here is the project: ${JSON.stringify(project)}`)
        const project_id = project._id.toString();
        queryObject["project_id"] = project_id;

        console.log(queryObject)

        const cursor = issues.find({project_id: project_id})
        const foundIssues = await cursor.toArray()
        if (!foundIssues) {
          res.json([{error: "No issues found!"}])
          console.log(`Here are the found issues: ${JSON.stringify(foundIssues)}`)
          res.json(foundIssues);
          return;
        } else {
          console.log(`Here are the found issues: ${JSON.stringify(foundIssues)}`)
          res.json(foundIssues);
          return;
        }
        

        // let queryObject = req.query
        // queryObject["project_id"] = project_id

        // if (Object.keys(queryObject).includes("open")) {
        //   if (queryObject["open"].toLowerCase() == "true") {
        //     queryObject["open"] = true;
        //   } else {
        //     queryObject["open"] = false;
        //   }
        // }

      }
    })
    
    .post(async (req, res) => {

      const projectName = req.params.project || '';

      // these are required
      const issue_title = req.body.issue_title || '';
      const issue_text = req.body.issue_text || '';
      const created_by = req.body.created_by || '';
      // end of required fields
      const assigned_to = req.body.assigned_to || '';
      const status_text = req.body.status_text || '';

      if (!issue_title || !issue_text || !created_by) {
        res.json({ 
          error: 'required field(s) missing' 
        });
        return;
      }

      // try to find a project to save the issue into
      const project = await projects.findOne({name: projectName});
      if (!project) {
        // first create the new project
        const newProject = new Project({name: projectName});
        try {
          const savedProject = await projects.insertOne(newProject);
        } catch (e) {
          res.json(`There was an error creating the new project: ${e}`);
          return;
        }
      } else {
        // add in the new issue
        // construct the valid issue
        const currentDate = new Date();

        const issueDocument = new Issue({
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to,
          status_text: status_text,
          open: true,
          created_on: currentDate,
          updated_on: currentDate,
          project_id: project._id
        })
        try {
          const savedIssue = await issues.insertOne(issueDocument);
          // console.log(savedIssue)
          res.json(issueDocument);
          return;
        } catch (e) {
          // res.json({error: `There was an error saving the new issue: ${e}`});
          return;
        }
      }


      // // save it to the database
      // const result = await issues.insertOne(new Issue(issueDocument))
      
      // if (result) {
      //   res.json(issueDocument)
      // }
      // const issue = await issues.findOne({_id: result.insertedId})
      // console.log(`Found issue: ${issue}`)

      // res.json(issue)
      // res.json({
      //   // _id: result.insertedId,
      //   // issue_title: req.body.issue_title,
      //   // issue_text: req.body.issue_text,
      //   // created_by: req.body.created_by,
      //   // assigned_to: req.body.assigned_to,
      //   // status_text: req.body.status_text,
      //   // created_on: issue.created_on,
      //   // updated_on: issue.updated_on,
      //   // open: issue.open,
      //   // status_text: issue.status_text
      // })
    })
    
    .put(async (req, res) => {
      // console.log(req.body);

      // this is what will be sent over to update
      let updatedFields = {}

      // for a "put", the one required field is "_id"
      const _id = req.body._id;

      if (!_id) {
        res.json({
          error: 'missing _id'
        })
        return;
      } else {

        const title = req.body.issue_title;
        const text = req.body.issue_text;
        const created_by = req.body.created_by;
        const assigned_to = req.body.assigned_to;
        const status = req.body.status_text;

        if (!title && !text && !created_by && !assigned_to && !status) {
          res.json({
            error: 'no update field(s) sent',
            '_id': _id
          });
          return;
        } else {

          Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== '') {
              updatedFields[key] = req.body[key]
            }
          })

          // console.log(updatedFields)

          try {
            const updatedIssue = await issues.updateOne(
              {_id: _id},
              {
                $set:{
                  updatedFields
                }
              }
            )
          } catch (e) {
            res.json({
              error: 'could not update', 
              '_id': _id
            })
            return;
          }

        }
        
      }

    })
    
    .delete(async (req, res) => {
      
      // https://stackoverflow.com/questions/78254051/the-signature-inputid-number-objectid-of-objectid-is-deprecated-use-sta
      const idToDelete = new ObjectId(req.body._id)

      console.log(idToDelete);

      if (!idToDelete) {
        console.log("The ID is falsy")
        res.json({
          error: 'missing _id'
        });
        return;
      } else {
        try {
          const result = await issues.findOneAndDelete({_id: idToDelete});
          if (result) {
            res.json({
              result: 'successfully deleted',
              '_id': idToDelete
            });
            return;
          }
        } catch (e) {
          res.json({
            error: 'could not delete',
            '_id': idToDelete
          });
          return;
        }
      }

    });
    
};
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
      console.log(projectName)

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
          // set the value to be a boolean because it doesn't save that way in the DB for some reason
          let openBool = queryObject["open"].toLowerCase();
          let openBoolValue = (openBool === "true");
          queryObject["open"] = openBoolValue;
        }

        console.log(`Here is the project: ${JSON.stringify(project)}`)
        const project_id = project._id.toString();
        queryObject["project_id"] = project_id;

        console.log(queryObject)

        const foundIssues = await issues.find(queryObject).toArray();
        if (!foundIssues) {
          res.json([{error: "No issues found!"}])
          return;
        } else {
          console.log(`Here are the found issues: ${JSON.stringify(foundIssues)}`);
          const issuesToReturn = []
          for (const foundIssue of foundIssues) {
            // this needs to be done so it matches what FCC wants to be displayed
            const { project_id, ...issueToReturn } = foundIssue;
            issuesToReturn.push(issueToReturn);
          }
          console.log(issuesToReturn)
          res.json(issuesToReturn);
          return;
        }

      }
    })
    
    .post(async (req, res) => {

      let projectId;
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
        // if there isn't a project, we need to create one before we can save the issue
        const newProject = new Project({
          name: projectName
        });
        try {
          const savedProject = await projects.insertOne(newProject);
          if (!savedProject) {
            res.json({
              error: `there was an error saving the new project to the database: ${e}`
            });
          } else {
            projectId = savedProject.insertedId;
          }
        } catch (e) {
          res.json({error: `there was an error saving the project: ${e}`});
        }
      } else {
        // if there is an existing project, get its _id.
        projectId = project._id;
      }

      // now that we have the project's ID (hopefully no matter what), we can finally create the issue
      // construct the issue
      const newIssue = new Issue({
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text,
        project_id: projectId
      });

      // then try to save the new issue to the database
      try {
        const savedIssue = await issues.insertOne(newIssue);
        if (!savedIssue) {
          res.json({error: 'couldn\'t save the issue'});
        } else {
          const foundIssue = await issues.findOne({_id: savedIssue.insertedId});
          // this needs to be done so it matches what FCC wants to be displayed
          const { project_id, ...issueToReturn } = foundIssue;
          res.json(issueToReturn);
        }
      } catch (e) {
        res.json({error: `there was an error saving the issue: ${e}`});
      }
    })
    
    .put(async (req, res) => {

      console.log(req.body);

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
            if (req.body[key] !== '' && key !== "_id") {
              updatedFields[key] = req.body[key]
            }
          })

          updatedFields["updated_on"] = Date.now();
          console.log(updatedFields)

          try {
            const updatedIssue = await issues.updateOne(
              {_id: new ObjectId(_id)},
              {
                $set:{
                  ...updatedFields
                }
              }
            );
            if (updatedIssue.matchedCount === 0) {
              res.json({
                error: 'could not update', 
                '_id': _id
              });
            } else {
              res.json({
                result: 'successfully updated',
                '_id': _id
              });
            }            
          } catch (e) {
            res.json({
              error: 'could not update', 
              '_id': _id
            });
            return;
          }

        }
        
      }

    })
    
    .delete(async (req, res) => {
      
      // https://stackoverflow.com/questions/78254051/the-signature-inputid-number-objectid-of-objectid-is-deprecated-use-sta
      const idToDelete = req.body._id || '';
      const projectName = req.params.project || '';

      if (!idToDelete) {
        return res.json({
          error: 'missing _id'
        });
      } else {
        try {
          const project = await projects.findOne({name: projectName});
          const project_id = project._id.toString();
          const result = await issues.findOneAndDelete({_id: new ObjectId(idToDelete), project_id: project_id});
          // console.log(result)
          if (!result) {
            res.json({
              error: 'could not delete',
              _id: idToDelete
            });
            return;
          } else {
            res.json({
              result: 'successfully deleted',
              _id: idToDelete
            });
            return;
          }
        } catch (e) {
          console.log(e);
          res.json({
            error: 'could not delete',
            _id: idToDelete
          });
        }       
      }

    });
    
};
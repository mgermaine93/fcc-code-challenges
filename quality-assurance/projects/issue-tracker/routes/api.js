'use strict';

const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
const MONGO_URL= process.env.MONGO_URL;
// const { MongoClient } = require('mongodb');

// set up the mongo DB connection
const client = new MongoClient(MONGO_URL);
const database = client.db("issue-tracker");
const issues = database.collection("issues");

// define the schema
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String,
    required: false
  },
  status_text: {
    type: String,
    required: false
  }
})

// compile model from schema
let Issue = mongoose.model("Issue", issueSchema, "issues");

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async (req, res) => {
      let project = req.params.project;
      let queryObject = {}
      console.log(req.body);

      let urlParams = req.query      
      if (urlParams) {
        console.log(urlParams)
        Object.keys(urlParams).forEach((key) => {
          if (req.query[key] !== '') {
            queryObject[key] = req.query[key]
          }
        })
      }
      console.log(queryObject)
      const foundIssues = await issues.find({queryObject})
      console.log(foundIssues)
      console.log(`Found issue: ${foundIssues}`)
      // res.json(foundIssues)
      // TBD
    })
    
    .post(async (req, res) => {
      let project = req.params.project;

      // construct the valid issue
      const issueDocument = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text
      }

      // save it to the database
      const result = await issues.insertOne(new Issue(issueDocument))
      console.log(result.insertedId)

      const issue = await issues.findOne({_id: result.insertedId})
      console.log(`Found issue: ${issue}`)

      res.json({
        _id: result.insertedId,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        created_on: issue.created_on,
        updated_on: issue.updated_on,
        open: issue.open,
        status_text: issue.status_text
      })
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
          })
        } else {

          Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== '') {
              updatedFields[key] = req.body[key]
            }
          })

          console.log(updatedFields)

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
          }

        }
        
      }

    })
    
    .delete(async (req, res) => {
      
      const idToDelete = req.body._id

      if (!idToDelete) {
        res.json({
          error: 'missing _id'
        });
      } else {
        try {
          const result = await issues.deleteOne({_id: idToDelete});
          if (result) {
            res.json({
              result: 'successfully deleted',
              '_id': idToDelete
            })
          }
        } catch (e) {
          res.json({
            error: 'could not delete',
            '_id': idToDelete
          })
        }
      }

    });
    
};
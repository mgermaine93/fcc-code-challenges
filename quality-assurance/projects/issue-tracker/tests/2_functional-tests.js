const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    suite('CREATE/POST tests', function() {

        test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker";
            const title = "Write tests for issue tracker project";
            const text = "Need to write 14 tests for the issue tracker project";
            const createdBy = "Matt";
            const assignedTo = "Matt";
            const statusText = "Assigned";
            chai
                .request(server)
                .keepOpen()
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title,
                    issue_text: text,
                    created_by: createdBy,
                    assigned_to: assignedTo,
                    status_text: statusText
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'issue_title', 'the response object should have an issue_title property')
                    assert.property(res.body, 'issue_text', 'the response object should have an issue_text property')
                    assert.property(res.body, 'created_by', 'the response object should have a created_by property')
                    assert.property(res.body, 'assigned_to', 'the response object should have an assigned_to property')
                    assert.property(res.body, 'status_text', 'the response object should have a status_text property')
                    assert.property(res.body, 'created_on', 'the response object should have a created_on property')
                    assert.property(res.body, 'updated_on', 'the response object should have an updated_on property')
                    assert.property(res.body, 'open', 'the response object should have an open property')
                    done();
                });
        });

        test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker";
            const title = "This is the first of the three required fields";
            const text = "This is the second of the three required fields";
            const createdBy = "This is the third of the three required fields";
            chai
                .request(server)
                .keepOpen()
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title,
                    issue_text: text,
                    created_by: createdBy
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'issue_title', 'the response object should have an issue_title property')
                    assert.property(res.body, 'issue_text', 'the response object should have an issue_text property')
                    assert.property(res.body, 'created_by', 'the response object should have a created_by property')
                    assert.property(res.body, 'assigned_to', 'the response object should have an assigned_to property')
                    assert.property(res.body, 'status_text', 'the response object should have a status_text property')
                    assert.property(res.body, 'created_on', 'the response object should have a created_on property')
                    assert.property(res.body, 'updated_on', 'the response object should have an updated_on property')
                    assert.property(res.body, 'open', 'the response object should have an open property')
                    done();
                });
        });

        test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker";
            const title = "This issue will have issues (hehe)";
            chai
                .request(server)
                .keepOpen()
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title
                })
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    // the deepStrictRqual was key here.
                    assert.deepStrictEqual(res.body, { error: 'required field(s) missing' });
                    done();
                });
        });
    });
    
    suite('VIEW/GET tests', function() {
        test('View issues on a project: GET request to /api/issues/{project}', (done) => {
            const projectName = "apitest";
            chai
                .request(server)
                .keepOpen()
                .get(`/api/issues/${projectName}`)
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.isArray(res.body, 'the response should be an array');
                    assert.property(res.body[0], '_id', 'each item in the response array should have an _id property')
                    assert.property(res.body[0], 'issue_title', 'each item in the response array should have an issue_title property')
                    assert.property(res.body[0], 'issue_text', 'each item in the response array should have an issue_text property')
                    assert.property(res.body[0], 'created_by', 'each item in the response array should have a created_by property')
                    assert.property(res.body[0], 'assigned_to', 'each item in the response array should have an assigned_to property')
                    assert.property(res.body[0], 'status_text', 'each item in the response array should have a status_text property')
                    assert.property(res.body[0], 'created_on', 'each item in the response array should have a created_on property')
                    assert.property(res.body[0], 'updated_on', 'each item in the response array should have an updated_on property')
                    assert.property(res.body[0], 'open', 'each item in the response array should have an open property')
                    done();
                });
        });

        test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
            const projectName = "apitest";
            const isOpen = true;
            chai
                .request(server)
                .keepOpen()
                .get(`/api/issues/${projectName}?open=${isOpen}`)
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.isArray(res.body, 'the response should be an array');
                    assert.equal(res.body[0].open, true, 'each object is the response array should have an "open" value of true');
                    assert.property(res.body[0], '_id', 'each item in the response array should have an _id property')
                    assert.property(res.body[0], 'issue_title', 'each item in the response array should have an issue_title property')
                    assert.property(res.body[0], 'issue_text', 'each item in the response array should have an issue_text property')
                    assert.property(res.body[0], 'created_by', 'each item in the response array should have a created_by property')
                    assert.property(res.body[0], 'assigned_to', 'each item in the response array should have an assigned_to property')
                    assert.property(res.body[0], 'status_text', 'each item in the response array should have a status_text property')
                    assert.property(res.body[0], 'created_on', 'each item in the response array should have a created_on property')
                    assert.property(res.body[0], 'updated_on', 'each item in the response array should have an updated_on property')
                    assert.property(res.body[0], 'open', 'each item in the response array should have an open property')
                    done();
                });
        });

        // TBD
        test('View issues on a project with multiple filters: GET request to /api/issues/{project}', (done) => {
            const projectName = "apitest";
            const isOpen = true;
            // need to add another filter
            chai
                .request(server)
                .keepOpen()
                .get(`/api/issues/${projectName}?open=${isOpen}`)
                .end(function (err, res) {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.isArray(res.body, 'the response should be an array');
                    assert.equal(res.body[0].open, true, 'each object is the response array should have an "open" value of true');
                    assert.property(res.body[0], '_id', 'each item in the response array should have an _id property')
                    assert.property(res.body[0], 'issue_title', 'each item in the response array should have an issue_title property')
                    assert.property(res.body[0], 'issue_text', 'each item in the response array should have an issue_text property')
                    assert.property(res.body[0], 'created_by', 'each item in the response array should have a created_by property')
                    assert.property(res.body[0], 'assigned_to', 'each item in the response array should have an assigned_to property')
                    assert.property(res.body[0], 'status_text', 'each item in the response array should have a status_text property')
                    assert.property(res.body[0], 'created_on', 'each item in the response array should have a created_on property')
                    assert.property(res.body[0], 'updated_on', 'each item in the response array should have an updated_on property')
                    assert.property(res.body[0], 'open', 'each item in the response array should have an open property')
                    done();
                });
        });
    });

    suite('UPDATE/PUT tests', function() {
        test('Update one field on an issue: PUT request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker-2";
            const title = "Write tests for issue tracker project";
            const text = "Need to write 14 tests for the issue tracker project";
            const createdBy = "Matt";
            const assignedTo = "Matt";
            const statusText = "Assigned";
            chai.request(server)
                .keepOpen()
                // post an issue first
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title,
                    issue_text: text,
                    created_by: createdBy,
                    assigned_to: assignedTo,
                    status_text: statusText
                })
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    // check to make sure that the issue posted without issue
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'issue_title', 'the response object should have an issue_title property')
                    assert.property(res.body, 'issue_text', 'the response object should have an issue_text property')
                    assert.property(res.body, 'created_by', 'the response object should have a created_by property')
                    assert.property(res.body, 'assigned_to', 'the response object should have an assigned_to property')
                    assert.property(res.body, 'status_text', 'the response object should have a status_text property')
                    assert.property(res.body, 'created_on', 'the response object should have a created_on property')
                    assert.property(res.body, 'updated_on', 'the response object should have an updated_on property')
                    assert.property(res.body, 'open', 'the response object should have an open property')

                    // retrieve the pertinent details for the issue that was just posted
                    const issueId = res.body._id;
                    const assignedTo = res.body.assigned_to;

                    // then try the update...
                    chai.request(server)
                        .keepOpen()
                        .put(`/api/issues/${projectName}`)
                        .send({
                            _id: issueId,
                            assigned_to: 'Dave'
                        })
                        .end((err, res) => {
                            if (err) {
                                console.log(`There was an error: ${err}`);
                                res.done(err);
                            }
                            // check to make sure that the issue deleted without issue
                            assert.equal(res.status, 200);
                            assert.isObject(res.body, 'the response should be an object')
                            assert.property(res.body, '_id', 'the response object should have an _id property')
                            assert.property(res.body, 'result', 'the response object should have a result property')
                            assert.deepStrictEqual(res.body, {'result': 'successfully updated','_id': issueId})
                            
                            // finally, confirm that the field actually updated
                            chai.request(server)
                                .keepOpen()
                                .get(`/api/issues/${projectName}?_id=${issueId}`)
                                .end((err, res) => {
                                    if (err) {
                                        console.log(`There was an error: ${err}`);
                                        res.done(err);
                                    }
                                    assert.equal(res.status, 200);
                                    assert.isArray(res.body, 'the response should be an array')
                                    assert.notEqual(res.body[0].assigned_to, assignedTo, 'expected the assigned_to value to be updated and different than before')
                                    done();
                                })
                    });
            });
        });

        test('Update multiple fields on an issue: PUT request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker-3";
            const title = "Write tests for issue tracker project";
            const text = "Need to write 14 tests for the issue tracker project";
            const createdBy = "Matt";
            const assignedTo = "Matt";
            const statusText = "Assigned";
            chai.request(server)
                .keepOpen()
                // post an issue first
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title,
                    issue_text: text,
                    created_by: createdBy,
                    assigned_to: assignedTo,
                    status_text: statusText
                })
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    // check to make sure that the issue posted without issue
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'issue_title', 'the response object should have an issue_title property')
                    assert.property(res.body, 'issue_text', 'the response object should have an issue_text property')
                    assert.property(res.body, 'created_by', 'the response object should have a created_by property')
                    assert.property(res.body, 'assigned_to', 'the response object should have an assigned_to property')
                    assert.property(res.body, 'status_text', 'the response object should have a status_text property')
                    assert.property(res.body, 'created_on', 'the response object should have a created_on property')
                    assert.property(res.body, 'updated_on', 'the response object should have an updated_on property')
                    assert.property(res.body, 'open', 'the response object should have an open property')

                    // retrieve the pertinent details for the issue that was just posted
                    const issueId = res.body._id;
                    const assignedTo = res.body.assigned_to;
                    const issueText = res.body.issue_text;

                    // then try the update...
                    chai.request(server)
                        .keepOpen()
                        .put(`/api/issues/${projectName}`)
                        .send({
                            _id: issueId,
                            assigned_to: 'Dave',
                            issue_text: 'Reassigned to Dave'
                        })
                        .end((err, res) => {
                            if (err) {
                                console.log(`There was an error: ${err}`);
                                res.done(err);
                            }
                            // check to make sure that the issue deleted without issue
                            assert.equal(res.status, 200);
                            assert.isObject(res.body, 'the response should be an object')
                            assert.property(res.body, '_id', 'the response object should have an _id property')
                            assert.property(res.body, 'result', 'the response object should have a result property')
                            assert.deepStrictEqual(res.body, {'result': 'successfully updated','_id': issueId})
                            
                            // finally, confirm that the field actually updated
                            chai.request(server)
                                .keepOpen()
                                .get(`/api/issues/${projectName}?_id=${issueId}`)
                                .end((err, res) => {
                                    if (err) {
                                        console.log(`There was an error: ${err}`);
                                        res.done(err);
                                    }
                                    assert.equal(res.status, 200);
                                    assert.isArray(res.body, 'the response should be an array')
                                    assert.equal(res.body[0]._id, issueId)
                                    assert.notEqual(res.body[0].assigned_to, assignedTo, 'expected the assigned_to value to be updated and different than before')
                                    assert.notEqual(res.body[0].issue_text, issueText, 'expected the issue_text value to be updated and different than before')
                                    done();
                                })
                    });
            });
        });

        test('Update an issue with missing _id: PUT request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker-4";
            const title = "Write tests for issue tracker project";
            const text = "Need to write 14 tests for the issue tracker project";
            const createdBy = "Matt";
            const assignedTo = "Matt";
            const statusText = "Assigned";
            chai.request(server)
                .keepOpen()
                // post an issue first
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title,
                    issue_text: text,
                    created_by: createdBy,
                    assigned_to: assignedTo,
                    status_text: statusText
                })
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    // check to make sure that the issue posted without issue
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'issue_title', 'the response object should have an issue_title property')
                    assert.property(res.body, 'issue_text', 'the response object should have an issue_text property')
                    assert.property(res.body, 'created_by', 'the response object should have a created_by property')
                    assert.property(res.body, 'assigned_to', 'the response object should have an assigned_to property')
                    assert.property(res.body, 'status_text', 'the response object should have a status_text property')
                    assert.property(res.body, 'created_on', 'the response object should have a created_on property')
                    assert.property(res.body, 'updated_on', 'the response object should have an updated_on property')
                    assert.property(res.body, 'open', 'the response object should have an open property')

                    // retrieve the pertinent details for the issue that was just posted
                    // const issueId = res.body._id; // omit the ID for this test
                    const assignedTo = res.body.assigned_to;
                    const issueText = res.body.issue_text;

                    // then try the update...
                    chai.request(server)
                        .keepOpen()
                        .put(`/api/issues/${projectName}`)
                        .send({
                            assigned_to: 'Dave',
                            issue_text: 'Reassigned to Dave'
                        })
                        .end((err, res) => {
                            if (err) {
                                console.log(`There was an error: ${err}`);
                                res.done(err);
                            }
                            // check to make sure that the issue deleted without issue
                            assert.equal(res.status, 200);
                            assert.isObject(res.body, 'the response should be an object')
                            assert.property(res.body, 'error', 'the response object should have an error property')
                            assert.deepStrictEqual(res.body, {error: 'missing _id'})
                            done()
                    });
            });
        });

        test('Update an issue with no fields to update: PUT request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker-4";
            const title = "Write tests for issue tracker project";
            const text = "Need to write 14 tests for the issue tracker project";
            const createdBy = "Matt";
            const assignedTo = "Matt";
            const statusText = "Assigned";
            chai.request(server)
                .keepOpen()
                // post an issue first
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title,
                    issue_text: text,
                    created_by: createdBy,
                    assigned_to: assignedTo,
                    status_text: statusText
                })
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    // check to make sure that the issue posted without issue
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'issue_title', 'the response object should have an issue_title property')
                    assert.property(res.body, 'issue_text', 'the response object should have an issue_text property')
                    assert.property(res.body, 'created_by', 'the response object should have a created_by property')
                    assert.property(res.body, 'assigned_to', 'the response object should have an assigned_to property')
                    assert.property(res.body, 'status_text', 'the response object should have a status_text property')
                    assert.property(res.body, 'created_on', 'the response object should have a created_on property')
                    assert.property(res.body, 'updated_on', 'the response object should have an updated_on property')
                    assert.property(res.body, 'open', 'the response object should have an open property')

                    const issueId = res.body._id;

                    // then try the update...
                    chai.request(server)
                        .keepOpen()
                        .put(`/api/issues/${projectName}`)
                        .send({_id: issueId})
                        .end((err, res) => {
                            if (err) {
                                console.log(`There was an error: ${err}`);
                                res.done(err);
                            }
                            // check to make sure that the issue deleted without issue
                            assert.equal(res.status, 200);
                            assert.isObject(res.body, 'the response should be an object')
                            assert.property(res.body, '_id', 'the response object should have an _id property')
                            assert.property(res.body, 'error', 'the response object should have an error property')
                            assert.deepStrictEqual(res.body, { error: 'no update field(s) sent', '_id': issueId })
                            done()
                    });
            });
        });

        test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', (done) => {
            const fakeIssueId = '000000000000000000000000';
            const projectName = "issue-tracker-5";
            const title = "Fake issue";
            chai.request(server)
                .keepOpen()
                // post an issue first
                .put(`/api/issues/${projectName}`)
                .send({
                    _id: fakeIssueId,
                    issue_title: title
                })
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    // check to make sure that the issue posted without issue
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'error', 'the response object should have an error property')
                    assert.deepStrictEqual(res.body, { error: 'could not update', '_id': fakeIssueId })
                    done()
            });
        });
    });

    // need to work on this suite some more...
    suite('DELETE tests', function() {
        test('Delete an issue: DELETE request to /api/issues/{project}', (done) => {
            const projectName = "issue-tracker";
            const title = "Write tests for issue tracker project";
            const text = "Need to write 14 tests for the issue tracker project";
            const createdBy = "Matt";
            const assignedTo = "Matt";
            const statusText = "Assigned";
            chai.request(server)
                .keepOpen()
                // post a book first
                .post(`/api/issues/${projectName}`)
                .send({
                    issue_title: title,
                    issue_text: text,
                    created_by: createdBy,
                    assigned_to: assignedTo,
                    status_text: statusText
                })
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    // check to make sure that the issue posted without issue
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'the response should be an object')
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'issue_title', 'the response object should have an issue_title property')
                    assert.property(res.body, 'issue_text', 'the response object should have an issue_text property')
                    assert.property(res.body, 'created_by', 'the response object should have a created_by property')
                    assert.property(res.body, 'assigned_to', 'the response object should have an assigned_to property')
                    assert.property(res.body, 'status_text', 'the response object should have a status_text property')
                    assert.property(res.body, 'created_on', 'the response object should have a created_on property')
                    assert.property(res.body, 'updated_on', 'the response object should have an updated_on property')
                    assert.property(res.body, 'open', 'the response object should have an open property')

                    // retrieve the pertinent details for the issue that was just posted
                    const issueId = res.body._id;

                    // then try the delete...
                    chai.request(server)
                        .keepOpen()
                        .delete(`/api/issues/${projectName}`)
                        .send({_id: issueId})
                        .end((err, res) => {
                            if (err) {
                                console.log(`There was an error: ${err}`);
                                res.done(err);
                            }
                            // check to make sure that the issue deleted without issue
                            assert.equal(res.status, 200);
                            assert.property(res.body, '_id', 'the response object should have an _id property')
                            assert.property(res.body, 'result', 'the response object should have a result property')
                            assert.deepStrictEqual(res.body, { result: 'successfully deleted', '_id': issueId });
                            done();
                    });
            });
        });

        test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', (done) => {
            // this is just a made-up ID that also fits the requirement for it to be a mongodb-friendly ID
            const projectName = "apitest";
            const fakeIssueId = '000000000000000000000000';
            chai.request(server)
                .keepOpen()
                .delete(`/api/issues/${projectName}`)
                .send({_id: fakeIssueId})
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(res.body, '_id', 'the response object should have an _id property')
                    assert.property(res.body, 'error', 'the response object should have an error property')
                    assert.deepStrictEqual(res.body, { error: 'could not delete', '_id': fakeIssueId });
                    done();
            });
        });

        test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', (done) => {
            // omit the ID
            const projectName = "apitest";
            chai.request(server)
                .keepOpen()
                .delete(`/api/issues/${projectName}`)
                .end((err, res) => {
                    if (err) {
                        console.log(`There was an error: ${err}`);
                        res.done(err);
                    }
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error', 'the response object should have an error property')
                    assert.deepStrictEqual(res.body, { error: 'missing _id' });
                    done();
            });
        });
    });
    
});
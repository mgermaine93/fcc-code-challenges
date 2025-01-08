/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  // /*
  // * ----[EXAMPLE TEST]----
  // * Each test should completely test the response of the API end-point including response status code!
  // */
  // test('#example Test GET /api/books', function(done){
  //    chai.request(server)
  //     .get('/api/books')
  //     .end(function(err, res){
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  // /*
  // * ----[END of EXAMPLE TEST]----
  // */

  suite('Routing tests', () => {

    // FIRST SUITE
    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', (done) => {
        const title = 'The Count of Monte Cristo';
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .send({title: title})
        .end((err, res) => {
          if (err) {
            console.log(`There was an error: ${err}`);
            res.done(err);
          }
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'the response should be an object.');
          assert.property(res.body, 'title', 'the submitted book should have a title.');
          assert.property(res.body, '_id', 'the submitted book should have an ID.');
          assert.equal(res.body.title, title, 'the submitted title should equal what the user input as the title.');
          done();
        });
      });
      
      test('Test POST /api/books with no title given', (done) => {
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .end((err, res) => {
          if (err) {
            console.log(`There was an error: ${err}`);
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing required field title');
          done()
        })
      });

    });


    // SECOND SUITE
    suite('GET /api/books => array of books', () => {
      
      test('Test GET /api/books', (done) => {
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end((err, res) => {
          if (err) {
            console.log(`There was an error: ${err}`);
            res.done(err);
          }
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'each book object in the array should contain a commentcount.');
          assert.property(res.body[0], 'title', 'each book object in the array should contain a title.');
          assert.property(res.body[0], '_id', 'each book object in the array should contain an _id.');
          done();
        });
      });      
      
    });


    // THIRD SUITE
    suite('GET /api/books/[id] => book object with [id]', () => {
      
      test('Test GET /api/books/[id] with id not in db', (done) => {
        const bookId = '000000000000000000000000';
        chai.request(server)
          .keepOpen()
          // this is just a made-up ID that also fits the requirement for it to be a mongodb-friendly ID
          .get(`/api/books/${bookId}`)
          .end((err, res) => {
            if (err) {
              console.log(`There was an error: ${err}`);
              res.done(err);
            }
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          })
      });
      
      test('Test GET /api/books/[id] with valid id in db', (done) => {
        const title = 'Not Without Peril';
        chai.request(server)
          .keepOpen()
          // post a book first
          .post('/api/books')
          .send({title: title})
          .end((err, res) => {
            if (err) {
              console.log(`There was an error: ${err}`);
              res.done(err);
            }

            // check to make sure that the book posted without issue
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'the response should be an object.');
            assert.property(res.body, 'title', 'the submitted book should have a title.');
            assert.property(res.body, '_id', 'the submitted book should have an ID.');
            assert.equal(res.body.title, title)

            // retrieve the pertinent details for the book that was just posted
            const bookId = res.body._id;
            const bookTitle = res.body.title;

            // then do the actual "get" test with the ID of the book retrieved above
            chai.request(server)
              .keepOpen()
              .get(`/api/books/${bookId}`)
              .end((err, res) => {
                if (err) {
                  console.log(`There was an error: ${err}`);
                  res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'the response should be an object.');
                assert.property(res.body, 'title', 'the submitted book should have a title.');
                assert.property(res.body, '_id', 'the submitted book should have an ID.');
                assert.equal(res.body.title, bookTitle, 'the retrieved title should equal what the user input as the title.');
                assert.equal(res.body._id, bookId, 'the retrieved ID should equal the ID of the book that the user originally submitted.');
                done();
              })
          });
      });
      
    });


    // FOURTH SUITE
    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      
      test('Test POST /api/books/[id] with comment', (done) => {
        chai.request(server)
          .keepOpen()
          // post a book first
          .post('/api/books')
          .send({title: 'PHP Crash Course'})
          .end((err, res) => {
            if (err) {
              console.log(`There was an error: ${err}`);
              res.done(err);
            }

            // check to make sure that the book posted without issue
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'the response should be an object.');
            assert.property(res.body, 'title', 'the submitted book should have a title.');
            assert.property(res.body, '_id', 'the submitted book should have an ID.');

            // retrieve the pertinent details for the book that was just posted
            const bookId = res.body._id;
            const bookTitle = res.body.title;
            const comment = 'test comment';

            // then do the actual test...
            chai.request(server)
              .keepOpen()
              .post(`/api/books/${bookId}`)
              // add the comment
              .send({comment: comment, book_id: bookId})
              .end((err, res) => {
                if (err) {
                  console.log(`There was an error: ${err}`);
                  res.done(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'the response should be an object.');
                assert.property(res.body, '_id', 'the submitted book should have an ID.');
                assert.property(res.body, 'title', 'the submitted book should have a title.');
                assert.property(res.body, 'comments', 'the submitted book should have at least one comment.');
                assert.equal(res.body._id, bookId, 'the retrieved ID should equal the ID of the book that the user originally submitted.')
                assert.equal(res.body.title, bookTitle, 'the retrieved title should equal what the user input as the title.');
                assert.equal(res.body.comments[0], comment, 'the retrieved title have a comment that matches what the user input.');
                done();
              })
          });
      });

      test('Test POST /api/books/[id] without comment field', (done) => {
        chai.request(server)
          .keepOpen()
          // post a book first
          .post('/api/books')
          .send({title: '50 Hikes in West Virginia'})
          .end((err, res) => {
            if (err) {
              console.log(`There was an error: ${err}`);
              res.done(err);
            }

            // check to make sure that the book posted without issue
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'the response should be an object.');
            assert.property(res.body, 'title', 'the submitted book should have a title.');
            assert.property(res.body, '_id', 'the submitted book should have an ID.');

            // retrieve the pertinent details for the book that was just posted
            const bookId = res.body._id;

            // then do the actual test...
            chai.request(server)
              .keepOpen()
              .post(`/api/books/${bookId}`)
              // withhold the comment this time...
              .send({book_id: bookId})
              .end((err, res) => {
                if (err) {
                  console.log(`There was an error: ${err}`);
                  res.done(err);
                }
                assert.equal(res.status, 200);
                assert.equal(res.text, 'missing required field comment');
                done();
              })
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', (done) => {
        // this is just a made-up ID that also fits the requirement for it to be a mongodb-friendly ID
        const bookId = '000000000000000000000000';
        chai.request(server)
          .keepOpen()
          .post(`/api/books/${bookId}`)
          .send({book_id: bookId, comment: 'test comment'})
          .end((err, res) => {
            if (err) {
              console.log(`There was an error: ${err}`);
              res.done(err);
            }
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          })
      });
      
    });

    
    // FIFTH SUITE
    suite('DELETE /api/books/[id] => delete book object id', () => {

      test('Test DELETE /api/books/[id] with valid id in db', (done) => {
        const title = 'Demon Copperhead';
        chai.request(server)
          .keepOpen()
          // post a book first
          .post('/api/books')
          .send({title: title})
          .end((err, res) => {
            if (err) {
              console.log(`There was an error: ${err}`);
              res.done(err);
            }
            // check to make sure that the book posted without issue
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'the response should be an object.');
            assert.property(res.body, 'title', 'the submitted book should have a title.');
            assert.property(res.body, '_id', 'the submitted book should have an ID.');

            // retrieve the pertinent details for the book that was just posted
            const bookId = res.body._id;

            // then try the delete...
            chai.request(server)
              .keepOpen()
              .delete(`/api/books/${bookId}`)
              .end((err, res) => {
                if (err) {
                  console.log(`There was an error: ${err}`);
                  res.done(err);
                }
                // check to make sure that the book deleted without issue
                assert.equal(res.status, 200);
                assert.equal(res.text, 'delete successful');
                done();
              });
          });   
      });

      test('Test DELETE /api/books/[id] with id not in db', (done) => {
        // this is just a made-up ID that also fits the requirement for it to be a mongodb-friendly ID
        const bookId = '000000000000000000000000';
        chai.request(server)
          .keepOpen()
          .delete(`/api/books/${bookId}`)
          .end((err, res) => {
            if (err) {
              console.log(`There was an error: ${err}`);
              res.done(err);
            }
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
    
    });

  });

});
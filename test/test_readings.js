/* test/test_dish.js*/

var request = require('supertest');
var assert = require('assert');
var mongoose = require('mongoose');

require('dotenv').config();
var app = require('../app');
var Readings = require('../models/readings');

var STRICT_REST = true; // change that to false depending on https://www.coursera.org/learn/server-side-development/lecture/bKtMl/exercise-video-rest-api-with-express-mongodb-and-mongoose/discussions/x1AZIu9SEeWB0QpuSDkq-Q
var HTTP_OK = 200;
var HTTP_CREATED = (STRICT_REST) ? 201 : HTTP_OK;
var HTTP_NOT_FOUND = 404;

/*
 * Data
 */
var readings_fixture = require('./fixtures/readings_fixture');
var new_reading = {
    // "_id": "12345",
    "date": Date("2016-03-22T08:26:13.158Z"),
    "sensors": [{
        "hum": 56,
        "sensor": "Ambient",
        "temp": 22
    }, {
        "hum": 8,
        "sensor": "Fridge",
        "temp": 7
    }, {
        "hum": 56,
        "sensor": "Curing",
        "temp": 3
    }]
};

var new_comment = {
    author: "Bob",
    rating: 3,
    comment: "Greeeaaaaat dish",
};

/*
 * Tests
 */
describe('Readings', function() {
    beforeEach(function(done) {
        Readings.remove({}, function(err, res) { // don't use drop() as this will occasionnnaly raise a background operation error
            Readings.insertMany(readings_fixture, done);
        });
    });

    describe('GET /reading', function() {
        it('respond with code 404 (wrong spelling)', function(done) {
            request(app)
                .get('/reading')
                .expect(HTTP_NOT_FOUND, done);
        });
    });

    describe('GET /readings', function() {
        it('respond with code HTTP_OK + list of readings', function(done) {
            request(app)
                .get('/readings')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HTTP_OK)
                .expect(function(res) {
                    assert.deepEqual(res.body, readings_fixture);
                })
                .end(done);
        });
    });

    describe('DELETE /readings', function() {
        it('responds with code HTTP_OK', function(done) {
            request(app)
                .delete('/readings')
                .expect(HTTP_OK)
                .expect(function(res) {
                    assert.deepEqual(res.body, { ok: 1, n: 10 });
                })
                .end(done);
        });
    });

    xdescribe('POST /readings', function() {
        it('HTTP_CREATED + data content', function(done) {
            request(app)
                .post('/readings')
                .set('Accept', 'application/json')
                .send(new_reading)
                .expect(HTTP_CREATED)
                .expect(function(res) {
                    assert.ok(res.body._id);
                    assert.equal(res.body._id, new_reading._id);
                })
                .end(done);
        });
    });

    describe('GET /readings/56f102d1c369bf0525c055f9', function() {
        it('respond with code HTTP_OK + data content', function(done) {
            request(app)
                .get('/readings/56f102d1c369bf0525c055f9')
                .set('Accept', 'application/json')
                .expect(HTTP_OK)
                .expect(function(res) {
                  console.log(res.body);
                    assert.deepEqual(res.body, readings_fixture[1]);
                })
                .end(done);
        });
    });

    xdescribe('PUT /dishes/000000000000000000001200', function() {
        it('respond with code HTTP_OK + data content', function(done) {
            request(app)
                .put('/dishes/000000000000000000001200')
                .set('Accept', 'application/json')
                .send(new_dish)
                .expect(HTTP_OK)
                .expect(function(res) {
                    assert.equal(res.body._id, "000000000000000000001200");
                    assert.equal(res.body.name, new_dish.name);
                    assert.deepEqual(res.body.comments, dishes_fixture[1].comments); // Keep old comments : this is *not* a REPLACE operation !
                })
                .end(done);
        });
    });

    xdescribe('DELETE /readings/56f102d1c369bf0525c055f9', function() {
        it('respond with code HTTP_OK + data content', function(done) {
            request(app)
                .delete('/readings/56f102d1c369bf0525c055f9')
                .expect(HTTP_OK)
                .expect(function(res) {
                    assert.deepEqual(res.body, readings_fixture[1]);
                })
                .end(done);
        });
    });


    xdescribe('GET /dishes/000000000000000000001300/comments', function() {
        it('respond with code HTTP_OK + data content', function(done) {
            request(app)
                .get('/dishes/000000000000000000001300/comments')
                .set('Accept', 'application/json')
                .expect(HTTP_OK)
                .expect(function(res) {
                    assert.deepEqual(res.body, dishes_fixture[2].comments);
                })
                .end(done);
        });
    });

    xdescribe('POST /dishes/000000000000000000001300/comments', function() {
        it('HTTP_CREATED + data content', function(done) {
            request(app)
                .post('/dishes/000000000000000000001300/comments')
                .set('Accept', 'application/json')
                .send(new_comment)
                .expect(HTTP_CREATED)
                .expect(function(res) {
                    assert.ok(res.body.comments[3]._id);
                    assert.equal(res.body.comments[3].author, new_comment.author);
                    assert.equal(res.body.comments[3].rating, new_comment.rating);
                    assert.equal(res.body.comments[3].comment, new_comment.comment);
                })
                .end(done);
        });
    });

    xdescribe('DELETE /dishes/000000000000000000001300/comments', function() {
        it('result code HTTP_OK + all comment cleared', function(done) {
            request(app)
                .delete('/dishes/000000000000000000001300/comments')
                .set('Accept', 'application/json')
                .send(new_comment)
                .expect(HTTP_OK)
                .end(function() {
                    request(app)
                        .get('/dishes/000000000000000000001300/comments')
                        .set('Accept', 'application/json')
                        .expect(HTTP_OK)
                        .expect(function(res) {
                            assert.deepEqual(res.body, []);
                        })
                        .end(done);
                });
        });
    });

});

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Readings = require('../models/readings');

var historyRouter = express.Router();

historyRouter.use(bodyParser.json());

historyRouter.route('/')
    .all(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    })
    .get(function(req, res, next) {
        var dateTo;
        var dateFrom = new Date();
        dateTo = new Date(Date.now());

        dateFrom.setDate(dateTo.getDate() - 7);
        var query = Readings.aggregate([{
            $match: {
                date: { $gte: dateFrom }
            }
        }, {
            $project: {
                sensors: 1,
                date: 1,
                theMod: { $mod: [{ $millisecond: "$date" }, 7] }
            }
        }, {
            $match: {
                theMod: { $eq: 0 }
            }
        }, {
            $sort: { date: 1 }
        }]);

        // var query = Readings.find({
        //         date: {
        //             $gte: dateFrom,
        //             $lt: dateTo
        //         }
        //     })
        //     .sort({ date: 1 });

        query.exec(function(err, reading) {
            if (err) throw err;
            res.json(reading);
        });
    });

historyRouter.route('/:daysBack')
    .all(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    })
    .get(function(req, res, next) {
        var dateTo;
        var dateFrom = new Date();
        dateTo = new Date(Date.now());
        dateFrom.setDate(dateTo.getDate() - req.params.daysBack);
        var query = Readings.aggregate([{
            $match: {
                date: { $gte: dateFrom }
            }
        }, {
            $project: {
                sensors: 1,
                date: 1,
                theMod: { $mod: [{ $millisecond: "$date" }, req.params.daysBack] }
            }
        }, {
            $match: {
                theMod: { $eq: 0 }
            }
        }, {
            $sort: { date: 1 }
        }]);
        // var query = Readings.find({
        //         date: {
        //             $gte: dateFrom,
        //             $lt: dateTo
        //         }
        //     })
        //     .sort({ date: 1 });
        query.exec(function(err, reading) {
            if (err) throw err;
            res.json(reading);
        });
    });

module.exports = historyRouter;

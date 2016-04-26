db.readings.aggregate(
    [{
        "$match": {
            "date": { "$gt": new Date(2013, 0, 1) }
        }
    }, {
        $unwind: {
            path: "$sensors"
        }
    }, {
        "$match": {
            "sensors.sensor": { "$eq": "Ambient" }
        }
    }, {
        $project: {
            sensors: 1,
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
        }
    }, {
        "$group": {
            "_id": {
                "date": "$yearMonthDay"
            },
            "cnt": {
                "$sum": 1
            },
            "avg-hum": {
                "$avg": "$sensors.hum"
            },
            "avg-temp": {
                "$avg": "$sensors.temp"
            }
        }
    }]);


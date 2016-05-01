db.readings.aggregate(
   [
     {
       $project: {
          yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          time: { $dateToString: { format: "%H:%M:%S:%L", date: "$date" } }
       }
     }
   ]
);

https://api.forecast.io/forecast/62888a9ff1907377b60a866701cf3338/-26.12431498586955,28.027605633880835

       var query = Readings.aggregate([{
            $match: {
                date: { $gte: dateFrom }
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
                "count": {
                    "$sum": 1
                },
                "avgHum": {
                    "$avg": "$sensors.hum"
                },
                "avgTemp": {
                    "$avg": "$sensors.temp"
                },
                "maxTemp": {
                    "$max": "$sensors.temp"
                },
                "minTemp": {
                    "$min": "$sensors.temp"
                },
                "maxHum": {
                    "$max": "$sensors.hum"
                },
                "minHum": {
                    "$min": "$sensors.hum"
                }
            }
        }, {
            $sort: { "_id.date": 1}
        }]);

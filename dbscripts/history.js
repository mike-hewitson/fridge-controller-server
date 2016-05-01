db.readings.aggregate(
    [{
        $project: {
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            time: { $dateToString: { format: "%H:%M:%S:%L", date: "$date" } }
        }
    }]
);

https: //api.forecast.io/forecast/62888a9ff1907377b60a866701cf3338/-26.12431498586955,28.027605633880835

    var query = Readings.aggregate([{
        $match: {
            date: { $gte: dateFrom }
        }
    }, {
        $project: {
            sensors: 1,
            date: 1,
            yearMonthDay: { $millisecond: "$date" }
        }
    }, {
        $sort: { "$date": 1 }
    }]);

db.orders.mapReduce(
    function() {
        var modDate = date.getMilliseconds() % 5;
        emit(this.date, this.sensors, modDate);
    },
    reduceFunction1, { out: "map_reduce_example" }
)

db.readings.aggregate([{
    $project: {
        sensors: 1,
        date: 1,
        theMod: { $mod: [{ $millisecond: "$date" }, 5] }
    }
}, {
    $match: {
        theMod : { $eq: 0 }
    }
}, {
    $sort: { date: 1 }
}]);

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


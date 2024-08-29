const mongoose = require('mongoose');

const OverallSchema = new mongoose.Schema({
  totalCustomers:Number,
  yearlySalesTotal:Number,
  yearlyTotalSoldUnit:Number,
  year:Number,
  monthlyData:[
    {
        month:String,
        totalSales:Number,
        totalUnits:Number,

    }
],

dailyData:[
    {
        date:String,
        totalSales:Number,
        totalUnits:Number
    }
],

salesByCatogery:{
    type:Map,
    of:Number,
}
},

{timestamps:true}
);

const Stat= mongoose.model('stat', OverallSchema );

module.exports = Stat;

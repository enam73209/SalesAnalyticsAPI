const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    product:{type:String, required:true},
    quantity:{type:String, required:true},
    price:{type:String, required:true}

},
    {timestamps:true,versionKey:false}
);
const SalesModel = mongoose.model('sales',DataSchema);
module.exports = SalesModel;
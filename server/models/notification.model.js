const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    tel: String,
    rota: Number,
    hora: Date,
    lat: Number,
    long: Number,
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);

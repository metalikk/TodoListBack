const mongoose = require('mongoose');

const schema = mongoose.Schema({
    todo : String
})
module.exports = mongoose.model('list', schema);
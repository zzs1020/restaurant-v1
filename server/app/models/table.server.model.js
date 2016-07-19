/**
 * Created by ZZS on 7/7/16.
 */
var mongoose = require('mongoose');

var TableSchema = new mongoose.Schema({
    tid: Number,
    size: Number,
    status: Boolean,
    time: String,
    code: String
});

var Table = mongoose.model('Table', TableSchema);
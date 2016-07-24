/**
 * Created by ZZS on 7/3/16.
 */
var express = require('./config/express'),
    mongodb = require('./config/mongoose'),

    
    compress = require('compression'),
    methodOverride = require('method-override');

var db = mongodb();
var serverapp = express();

module.exports = serverapp;

'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name : {
		type : 'String',
		required : 'Category name is required'
	},
	description : {
		type: 'String',
	}
});

mongoose.model("Category",categorySchema);
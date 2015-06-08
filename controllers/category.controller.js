'use strict';
var mongoose = require("mongoose");
require("../models/category.model");

var Category = mongoose.model("Category");

module.exports = {

	create: function(req,res){
		Category.create(req.body,function(err,result){
			if(err){
				return res.json(err);
			}
			res.json(result);
		})
	},
	getAll: function(req,res){
		console.log("here");
		Category.find({}, function(err,result){
			if(err){
				return res.json(err);
			}
			res.json(result);
		})
	},
	getOne: function(req,res){
		Category.findById(req.params.id,function(err,result){
			if(err){
				return res.json(err);
			}
			res.json(result);
		})
	},
	update: function(req,res){
		console.log(1,req.params);
		console.log(1,req.body);
		Category.update({_id:req.params.id}, req.body, function(err,result){
			if(err){
				return res.json(err);
			}
			res.json(result);
		})
	},
	remove: function(req,res){
		Category.remove({}, function(err,result){
			if(err){
				return res.json(err);
			}
			res.json(result);
		})
	},
	removeOne: function(req,res){
		Category.remove({_id:req.params.id}, function(err,result){
			if(err){
				return res.json(err);
			}
			res.json(result);
		})
	}
}
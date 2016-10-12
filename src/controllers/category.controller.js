import mongoose from 'mongoose';
import Category from "../models/category.model"

export default {
	create: function(req,res){
		Category.create(req.body,function(err,result){
			if(err){
				return res.json(err);
			}
			res.json(result);
		})
	},
	getAll: function(req,res){
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

'use strict';

var express = require("express");
var router = express.Router();
var category = require("../controllers/category.controller.js");


module.exports = function(app){
	router.route("/categories")
		.get(category.getAll)
		.post(category.create)
		.delete(category.remove)
	router.route("/category/:id")
		.get(category.getOne)
		.put(category.update)
		.delete(category.removeOne)

	app.use("/api",router);
}

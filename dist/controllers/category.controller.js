"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _category = require("../models/category.model");

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	create: function create(req, res) {
		_category2.default.create(req.body, function (err, result) {
			if (err) {
				return res.json(err);
			}
			res.json(result);
		});
	},
	getAll: function getAll(req, res) {
		_category2.default.find({}, function (err, result) {
			if (err) {
				return res.json(err);
			}
			res.json(result);
		});
	},
	getOne: function getOne(req, res) {
		_category2.default.findById(req.params.id, function (err, result) {
			if (err) {
				return res.json(err);
			}
			res.json(result);
		});
	},
	update: function update(req, res) {
		_category2.default.update({ _id: req.params.id }, req.body, function (err, result) {
			if (err) {
				return res.json(err);
			}
			res.json(result);
		});
	},
	remove: function remove(req, res) {
		_category2.default.remove({}, function (err, result) {
			if (err) {
				return res.json(err);
			}
			res.json(result);
		});
	},
	removeOne: function removeOne(req, res) {
		_category2.default.remove({ _id: req.params.id }, function (err, result) {
			if (err) {
				return res.json(err);
			}
			res.json(result);
		});
	}
};
//# sourceMappingURL=category.controller.js.map
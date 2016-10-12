"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _categoryController = require("../controllers/category.controller.js");

var _categoryController2 = _interopRequireDefault(_categoryController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var categoryRoutes = function categoryRoutes(app) {
	router.route("/categories").get(_categoryController2.default.getAll).post(_categoryController2.default.create).delete(_categoryController2.default.remove);
	router.route("/category/:id").get(_categoryController2.default.getOne).put(_categoryController2.default.update).delete(_categoryController2.default.removeOne);

	app.use("/api", router);
};

exports.default = categoryRoutes;
//# sourceMappingURL=category.route.js.map
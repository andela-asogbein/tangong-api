'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _category = require('../controllers/category.controller');

var _category2 = _interopRequireDefault(_category);

var _auth = require('../controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var categoryRoutes = function categoryRoutes(app) {
    router.route("/categories").get(_category2.default.getAll).post(_auth2.default.verifyToken, _auth2.default.isAdmin, _category2.default.create) //example of the two verification permissions allowed
    .delete(_category2.default.remove);
    router.route("/category/:id").get(_category2.default.getOne).put(_category2.default.update).delete(_category2.default.removeOne);

    app.use("/api", router);
};

exports.default = categoryRoutes;
//# sourceMappingURL=category.route.js.map
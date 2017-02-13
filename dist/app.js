'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _category = require('./routes/category.route');

var _category2 = _interopRequireDefault(_category);

var _user = require('./routes/user.route');

var _user2 = _interopRequireDefault(_user);

var _gig = require('./routes/gig.route');

var _gig2 = _interopRequireDefault(_gig);

var _payment = require('./routes/payment.route');

var _payment2 = _interopRequireDefault(_payment);

var _connection = require('./routes/connection.route');

var _connection2 = _interopRequireDefault(_connection);

var _auth = require('./routes/auth.route');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tango_db');

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)("dev"));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
    next();
});

(0, _category2.default)(app);
(0, _user2.default)(app);
(0, _gig2.default)(app);
(0, _payment2.default)(app);
(0, _connection2.default)(app);
(0, _auth2.default)(app);

exports.default = app;
//# sourceMappingURL=app.js.map
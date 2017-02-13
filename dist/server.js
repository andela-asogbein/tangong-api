"use strict";

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 8080;

_app2.default.listen(port, function (err) {
    if (err) {
        return err;
    }
    console.log("Server started at http://localhost:%s", port);
});
//# sourceMappingURL=server.js.map
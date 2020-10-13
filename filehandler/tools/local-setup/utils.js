"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = void 0;
var crypto_1 = require("crypto");
function randomString(length) {
    return crypto_1.randomBytes(length).toString("base64").slice(0, length);
}
exports.randomString = randomString;
//# sourceMappingURL=utils.js.map
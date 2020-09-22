"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indentLevel = 0;
function log(message) {
    // could do more later
    console.log("" + (new Array(indentLevel * 2)).fill(" ").join("") + message);
}
exports.log = log;
function enter(name) {
    console.log();
    console.log((new Array(indentLevel * 2)).fill(" ").join("") + "Entering: " + name);
    indentLevel++;
}
exports.enter = enter;
function leave(name) {
    indentLevel--;
    console.log((new Array(indentLevel * 2)).fill(" ").join("") + "Leaving: " + name);
    console.log();
}
exports.leave = leave;
function reset() {
    console.clear();
}
exports.reset = reset;
//# sourceMappingURL=logger.js.map
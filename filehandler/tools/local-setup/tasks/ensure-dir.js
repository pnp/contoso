"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var logger_1 = require("../logger");
exports.dirName = ".local-dev-secrets";
var EnsureDevSecretsFolder = function (root) {
    logger_1.enter("EnsureDevSecretsFolder");
    var resolvedPath = path_1.resolve(root, exports.dirName);
    logger_1.log("Resolved Path: " + resolvedPath);
    if (!fs_1.existsSync(resolvedPath)) {
        logger_1.log("Folder does not exist, creating...");
        fs_1.mkdirSync(resolvedPath);
        logger_1.log("Folder created at " + resolvedPath + ".");
    }
    else {
        logger_1.log("Folder exists, no action taken.");
    }
    logger_1.leave("EnsureDevSecretsFolder");
    return resolvedPath;
};
exports.default = EnsureDevSecretsFolder;
//# sourceMappingURL=ensure-dir.js.map
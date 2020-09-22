"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var logger_1 = require("../logger");
var path_1 = require("path");
var utils_1 = require("../utils");
var WriteLocalSSLCerts = function (folderPath) {
    logger_1.enter("WriteLocalSSLCerts");
    logger_1.log("Generating certs...");
    var passphrase = utils_1.randomString(50);
    logger_1.log("Using passphrase: " + passphrase);
    child_process_1.execFileSync("openssl", [
        "req",
        "-x509",
        "-newkey",
        "rsa:2048",
        "-keyout",
        "" + path_1.resolve(folderPath, "keytmp.pem"),
        "-out",
        "" + path_1.resolve(folderPath, "cert.pem"),
        "-days",
        "365",
        "-passout",
        "pass:" + passphrase,
        "-subj",
        "'/C=US/ST=Washington/L=Seattle/CN=localhost'",
    ]);
    child_process_1.execFileSync("openssl", [
        "rsa",
        "-in",
        "" + path_1.resolve(folderPath, "keytmp.pem"),
        "-out",
        "" + path_1.resolve(folderPath, "key.pem"),
        "-passin",
        "pass:" + passphrase,
    ]);
    logger_1.log("Generated certs.");
    logger_1.leave("WriteLocalSSLCerts");
};
exports.default = WriteLocalSSLCerts;
// openssl req -x509 -newkey rsa:2048 -keyout ./dev-secrets/keytmp.pem -out ./dev-secrets/cert.pem -days 365
// openssl rsa -in ./dev-secrets/keytmp.pem -out ./dev-secrets/key.pem
//# sourceMappingURL=create-ssl-files.js.map
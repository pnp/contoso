"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("./tasks");
var logger_1 = require("./logger");
/**
 * This script will perform the following setup actions for you to assist with local development. It
 * can also serve as a starting point to write production setup scripts customized for your needs.
 *
 * - ensure directory .local-dev-secrets exists
 *
 * - create file handler application with Files.ReadWrite.All, openid -> record app id and secret in .local-dev-secrets/settings.js
 *   - consent the permissions
 *
 * - inject the file handler manifest into the newly created application
 *
 * - write the local settings file used for testing
 *
 * - create SSL certs for development use (requires OpenSSL installed locally on machine)
 *
 */
function Setup(workingDir) {
    if (workingDir === void 0) { workingDir = process.env.INIT_CWD; }
    return __awaiter(this, void 0, void 0, function () {
        var secretsDir, _a, token, tenantId, _b, appId, appSecret, created, id;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    logger_1.reset();
                    logger_1.log("Starting local development setup process...");
                    logger_1.log("Working directory: " + workingDir);
                    secretsDir = tasks_1.EnsureDir(workingDir);
                    return [4 /*yield*/, tasks_1.GetToken()];
                case 1:
                    _a = _c.sent(), token = _a.token, tenantId = _a.tenantId;
                    return [4 /*yield*/, tasks_1.EnsureApp(token)];
                case 2:
                    _b = _c.sent(), appId = _b.appId, appSecret = _b.appSecret, created = _b.created, id = _b.id;
                    if (!created) return [3 /*break*/, 4];
                    // we need to inject the manifest into the new app
                    return [4 /*yield*/, tasks_1.InjectManifest(token, id)];
                case 3:
                    // we need to inject the manifest into the new app
                    _c.sent();
                    // write the local settings file that will be used by the webserver to auth
                    tasks_1.WriteLocalSettings(secretsDir, tenantId, appId, appSecret);
                    _c.label = 4;
                case 4:
                    // we need to create the ssl files in the .local-dev-secrets folder
                    tasks_1.WriteLocalSSLCerts(secretsDir);
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = Setup;
//# sourceMappingURL=index.js.map
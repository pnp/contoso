"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var logger_1 = require("../logger");
var fetch_1 = require("../fetch");
var appDisplayName = "Contoso-FileHandler-Markdown";
var EnsureApp = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, apps, createResponseJson, createServicePrincipalResponseJson, principalInfos, addPasswordResponseJson, appSecret;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.enter("CreateApp");
                headers = fetch_1.getHeaders(token);
                return [4 /*yield*/, fetch_1.fetch("https://graph.microsoft.com/v1.0/applications?$filter=displayName eq '" + appDisplayName + "'&$select=displayName,id,appId", __assign({}, headers)).then(fetch_1.isError).then(fetch_1.toJson())];
            case 1:
                apps = _a.sent();
                if (apps.length > 0) {
                    // the task already exists
                    logger_1.log("Application " + appDisplayName + " already exists with id " + apps[0].id + ". No action taken.");
                    return [2 /*return*/, { displayName: appDisplayName, appId: apps[0].appId, id: apps[0].id, created: false }];
                }
                logger_1.log("Application " + appDisplayName + " not found in directory. Creating app...");
                return [4 /*yield*/, fetch_1.fetch("https://graph.microsoft.com/v1.0/applications", __assign({ body: JSON.stringify({
                            api: {
                                "acceptMappedClaims": null,
                                "knownClientApplications": [],
                                "oauth2PermissionScopes": [],
                                "preAuthorizedApplications": [],
                                "requestedAccessTokenVersion": 2,
                            },
                            displayName: appDisplayName,
                            isFallbackPublicClient: true,
                            signInAudience: "AzureADMyOrg",
                            web: {
                                redirectUris: ["https://localhost:3000/api/auth/login"],
                                logoutUrl: "https://localhost:3000/api/auth/logout",
                                implicitGrantSettings: {
                                    enableIdTokenIssuance: false,
                                    enableAccessTokenIssuance: false,
                                },
                            },
                        }), method: "POST" }, headers)).then(fetch_1.isError).then(fetch_1.toJson())];
            case 2:
                createResponseJson = _a.sent();
                logger_1.log("Created new application with name " + createResponseJson.displayName + " and appId " + createResponseJson.appId + ".");
                logger_1.log("Creating service principal for appId: " + createResponseJson.appId + ".");
                return [4 /*yield*/, fetch_1.fetch("https://graph.microsoft.com/v1.0/serviceprincipals", __assign({ body: JSON.stringify({
                            appId: createResponseJson.appId,
                        }), method: "POST" }, headers)).then(fetch_1.isError).then(fetch_1.toJson())];
            case 3:
                createServicePrincipalResponseJson = _a.sent();
                logger_1.log("Created service principal for appId: " + createResponseJson.appId + ".");
                logger_1.log("Adding permission scopes...");
                return [4 /*yield*/, fetch_1.fetch("https://graph.microsoft.com/v1.0/servicePrincipals?$filter=displayName eq 'Microsoft Graph'&$select=id", __assign({}, headers)).then(fetch_1.isError).then(fetch_1.toJson())];
            case 4:
                principalInfos = _a.sent();
                // make sure we got one
                if (principalInfos.length < 1) {
                    throw Error("Could not locate 'Microsoft Graph' service principal");
                }
                // now we need to assign scopes to the application so it can do what we need (sign in users and read their files)
                return [4 /*yield*/, fetch_1.fetch("https://graph.microsoft.com/v1.0/oauth2PermissionGrants", __assign({ body: JSON.stringify({
                            clientId: createServicePrincipalResponseJson.id,
                            consentType: "AllPrincipals",
                            endTime: "9000-01-01T00:00:00",
                            principalId: null,
                            resourceId: principalInfos[0].id,
                            scope: "openid Files.ReadWrite.All",
                            startTime: "0001-01-01T00:00:00",
                        }), method: "POST" }, headers)).then(fetch_1.isError)];
            case 5:
                // now we need to assign scopes to the application so it can do what we need (sign in users and read their files)
                _a.sent();
                logger_1.log("Added permission scopes.");
                logger_1.log("Adding app secret...");
                return [4 /*yield*/, fetch_1.fetch("https://graph.microsoft.com/v1.0/applications/" + createResponseJson.id + "/addPassword", __assign({ body: JSON.stringify({
                            displayName: "local-testing-secret",
                        }), method: "POST" }, headers)).then(fetch_1.isError).then(fetch_1.toJson())];
            case 6:
                addPasswordResponseJson = _a.sent();
                appSecret = addPasswordResponseJson.secretText;
                logger_1.log("Added app secret.");
                logger_1.leave("CreateApp");
                return [2 /*return*/, { displayName: appDisplayName, appId: createResponseJson.appId, id: createResponseJson.id, appSecret: appSecret, created: true }];
        }
    });
}); };
exports.default = EnsureApp;
//# sourceMappingURL=ensure-app.js.map
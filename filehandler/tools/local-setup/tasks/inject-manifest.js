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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
var fetch_1 = require("../fetch");
var uuid_1 = require("uuid");
var dirName = ".dev-secrets";
// defines the actions in our manifest
var actions = [
    {
        "type": "newFile",
        "url": "https: //localhost:3000/markdown/create",
        // tslint:disable-next-line: object-literal-sort-keys
        "availableOn": {
            "file": {
                "extensions": [
                    ".md",
                ],
            },
            "web": {},
        },
    },
    {
        "type": "open",
        "url": "https: //localhost:3000/markdown/edit",
        // tslint:disable-next-line: object-literal-sort-keys
        "availableOn": {
            "file": {
                "extensions": [
                    ".md",
                ],
            },
            "web": {},
        },
    },
    {
        "type": "preview",
        "url": "https: //localhost:3000/markdown/preview",
        // tslint:disable-next-line: object-literal-sort-keys
        "availableOn": {
            "file": {
                "extensions": [
                    ".md",
                ],
            },
            "web": {},
        },
    },
];
// tslint:disable: object-literal-sort-keys
var fileTypeIcon = {
    svg: "https://localhost:3000/images/icons/icon.svg",
    png1x: "https://localhost:3000/images/icons/icon@1x.png",
    "png1.5x": "https://localhost:3000/images/icons/icon@1.5x.png",
    png2x: "https://localhost:3000/images/icons/icon@2x.png",
};
// tslint:disable: object-literal-sort-keys
var appIcon = {
    svg: "https://localhost:3000/images/icons/app-icon.svg",
    png1x: "https://localhost:3000/images/icons/app-icon@1x.png",
    "png1.5x": "https://localhost:3000/images/icons/app-icon@1.5x.png",
    png2x: "https://localhost:3000/images/icons/app-icon@2x.png",
};
// defines the body of the manifest
var defaultManifest = {
    "id": uuid_1.v4(),
    "properties": [
        {
            "key": "version",
            "value": "2",
        },
        {
            "key": "fileTypeDisplayName",
            "value": "Contso Markdown",
        },
        {
            "key": "fileTypeIcon",
            // tslint:disable-next-line: max-line-length
            "value": JSON.stringify(fileTypeIcon),
        },
        {
            "key": "appIcon",
            // tslint:disable-next-line: max-line-length
            "value": JSON.stringify(appIcon),
        },
        {
            "key": "actions",
            // tslint:disable-next-line: max-line-length
            "value": JSON.stringify(actions),
        },
    ],
    "type": "FileHandler",
};
var InjectManifest = function (token, objectId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.enter("InjectManifest");
                logger_1.log("Injecting manifest into app: " + objectId + ". This operation will clear all previous manifests added for this app.");
                return [4 /*yield*/, fetch_1.fetch("https://graph.microsoft.com/v1.0/applications/" + objectId + "/addIns", __assign({ body: JSON.stringify({
                            value: [defaultManifest],
                        }), method: "PUT" }, fetch_1.getHeaders(token))).then(fetch_1.isError)];
            case 1:
                _a.sent();
                logger_1.log("Injected manifest successfully.");
                logger_1.leave("InjectManifest");
                return [2 /*return*/];
        }
    });
}); };
exports.default = InjectManifest;
//# sourceMappingURL=inject-manifest.js.map
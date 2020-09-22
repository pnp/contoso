"use strict";
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
// import { createInterface } from "readline";
var msal_node_1 = require("@azure/msal-node");
var GetToken = function () { return __awaiter(_this, void 0, void 0, function () {
    var tenantId, appId, token, pca, tokenResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.enter("GetToken");
                logger_1.log("Beginning device-code flow.");
                tenantId = "ef379d32-30d7-46fd-9bc8-971e0cfff9bd";
                appId = "0560b025-e23a-4d7d-9862-45105defab5b";
                logger_1.log("Using appId: " + appId + " in tenant id: " + tenantId);
                token = "";
                // tslint:disable-next-line: max-line-length
                token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6InhveDE2NWUyMXM0akxNLURueUZUVE9xN0RIeC1xZGdQYkZEaEc0RG9tc00iLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lZjM3OWQzMi0zMGQ3LTQ2ZmQtOWJjOC05NzFlMGNmZmY5YmQvIiwiaWF0IjoxNjAwODA2MjgyLCJuYmYiOjE2MDA4MDYyODIsImV4cCI6MTYwMDgxMDE4MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhRQUFBQUtFTWZ1cm1hckluM2FKU0s0RkNmMy94aXJ5MTN0U1ptbzE2UkwvckFjbG1LZWRRdkhUaU15MUhXeHdPdncvRFNTTHI5bjl6SmFvYUlYZkRibFZubitRPT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6ImZpbGVoYW5kbGVyIGxvY2FsZGV2IHNldHVwIiwiYXBwaWQiOiIwNTYwYjAyNS1lMjNhLTRkN2QtOTg2Mi00NTEwNWRlZmFiNWIiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlJvZGdlcnMiLCJnaXZlbl9uYW1lIjoiUGF0cmljayIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjczLjE0OC40My43OCIsIm5hbWUiOiJQYXRyaWNrIiwib2lkIjoiMWQ3Zjg3NmEtNDljMi00YjA1LThjYTQtY2I4MTlhZTg0MGM0IiwicGxhdGYiOiIxNCIsInB1aWQiOiIxMDAzN0ZGRTgyQzNFMkUxIiwicmgiOiIwLkFBQUFNcDAzNzljd19VYWJ5SmNlRFBfNXZTV3dZQVU2NG4xTm1HSkZFRjN2cTF0YkFFQS4iLCJzY3AiOiJEaXJlY3RvcnkuQWNjZXNzQXNVc2VyLkFsbCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJScjVwaHZYaXRRcWtTcHAtd21lbU9pRllVc0FDSTg3WXVvbXExXzhZYkNNIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiZWYzNzlkMzItMzBkNy00NmZkLTliYzgtOTcxZTBjZmZmOWJkIiwidW5pcXVlX25hbWUiOiJwYXRyaWNrQHRocmVlMThzdHVkaW9zLmNvbSIsInVwbiI6InBhdHJpY2tAdGhyZWUxOHN0dWRpb3MuY29tIiwidXRpIjoiNnlDQVhXWUtTRVNsUlBRRENOTkZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJQSG1XWnJoSU0ybXZuRk9jaFhPQmVtTFVCdzFzRDhWMlU0ZUluNm9SVmNBIn0sInhtc190Y2R0IjoxMzQ5MjczMjkyfQ.0cALsAriDRI8mTj-mSIOjt8adrvk0qaaRvc1Ah6BjE1-QF3aVbQoViqv2NSDU0kJK0lDB1ijhphty9XSZEYxtb0JaMD8Br7q9RduOOxdB2CbpVPYIA06FT6e040YeB0gc7BkrzncqAx5FhS6Pu9Lq6GXdCzue1EBp8BC65sdPF5b6BcbHzpXsRTxTB6qK4wuWTg5ToJFdx6yxDmvrdb0KkkPim4_l4C7nLkBltoMpfr1dHPqiYm6dc-NzIcgARuOi8a_7oqSNX6-WuMqVet3U_PD9BnmbEMiTzc0QlMDrQSgtmxJ-Enso24RLakTx0YpvgQDR1Yi75NIipDaGx37Pw";
                logger_1.log("Requesting token");
                if (!(token === "")) return [3 /*break*/, 2];
                pca = new msal_node_1.PublicClientApplication({
                    auth: {
                        authority: "https://login.microsoftonline.com/" + tenantId,
                        clientId: appId,
                    },
                });
                return [4 /*yield*/, pca.acquireTokenByDeviceCode({
                        deviceCodeCallback: function (response) { return (console.log(response.message)); },
                        scopes: ["Directory.AccessAsUser.All"],
                    })];
            case 1:
                tokenResponse = _a.sent();
                token = tokenResponse.accessToken;
                _a.label = 2;
            case 2:
                logger_1.log("Token acquired");
                logger_1.leave("GetToken");
                return [2 /*return*/, { appId: appId, tenantId: tenantId, token: token }];
        }
    });
}); };
exports.default = GetToken;
//# sourceMappingURL=get-token.js.map
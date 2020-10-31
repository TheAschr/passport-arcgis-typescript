"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const passport_oauth2_1 = __importStar(require("passport-oauth2"));
class Strategy extends passport_oauth2_1.default {
    constructor(options, verify) {
        super(Object.assign({ tokenURL: "https://www.arcgis.com/sharing/oauth2/token", authorizationURL: "https://www.arcgis.com/sharing/oauth2/authorize" }, options), verify);
        this._userProfileURL = "https://www.arcgis.com/sharing/rest/community/self?f=json";
        this.name = "arcgis";
    }
    userProfile(accessToken, done) {
        this._oauth2.get(this._userProfileURL, accessToken, function (err, body) {
            if (err) {
                return done(new passport_oauth2_1.InternalOAuthError("failed to fetch user profile", err));
            }
            if (typeof body !== "string") {
                return done(new passport_oauth2_1.InternalOAuthError(`got a response body of type ${typeof body}. Expected type 'string'`, err));
            }
            try {
                const json = JSON.parse(body);
                const profile = {
                    provider: "arcgis",
                    id: json.username,
                    displayName: json.fullName,
                    fullname: json.fullName,
                    username: json.username,
                    orgId: json.orgId,
                    emails: [{ value: json.email }],
                    role: json.role,
                    _json: json,
                    _raw: body,
                };
                done(null, profile);
            }
            catch (err) {
                done(err);
            }
        });
    }
}
exports.Strategy = Strategy;
//# sourceMappingURL=Strategy.js.map
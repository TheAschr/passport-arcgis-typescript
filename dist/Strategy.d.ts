/// <reference types="node" />
import OAuth2Strategy, { StrategyOptions as OAuth2StrategyOptions, VerifyCallback } from "passport-oauth2";
import passport from "passport";
export interface Profile extends passport.Profile {
    orgId: string;
    fullname: string;
    role: "org_admin" | "org_publisher" | "org_user";
    _raw: string | Buffer | undefined;
    _json: any;
}
declare type VerifyFunction = ((accessToken: string, refreshToken: string, profile: Profile, verified: OAuth2Strategy.VerifyCallback) => void) | ((accessToken: string, refreshToken: string, results: any, profile: Profile, verified: OAuth2Strategy.VerifyCallback) => void);
export declare type StrategyOptions = Pick<OAuth2StrategyOptions, "clientID" | "clientSecret" | "callbackURL">;
export declare class Strategy extends OAuth2Strategy {
    private readonly _userProfileURL;
    constructor(options: StrategyOptions, verify: VerifyFunction);
    userProfile(accessToken: string, done: VerifyCallback): void;
}
export {};

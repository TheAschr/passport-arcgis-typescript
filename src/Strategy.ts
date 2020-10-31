import OAuth2Strategy, {
  StrategyOptions as OAuth2StrategyOptions,
  InternalOAuthError,
} from "passport-oauth2";
import passport from "passport";

// Api Documentation - https://developers.arcgis.com/rest/users-groups-and-items/portal-self.htm

export interface Profile extends passport.Profile {
  orgId: string;
  fullname: string;
  role: "org_admin" | "org_publisher" | "org_user";
  _raw: string | Buffer | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _json: any;
}

type VerifyCallback = (
  err?: Error | null | undefined,
  user?: Profile | undefined
) => void;

type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => void;

export type StrategyOptions = Pick<
  OAuth2StrategyOptions,
  "clientID" | "clientSecret" | "callbackURL"
>;

export class Strategy extends OAuth2Strategy {
  private readonly _userProfileURL: string =
    "https://www.arcgis.com/sharing/rest/community/self?f=json";

  constructor(options: StrategyOptions, verify: VerifyFunction) {
    super(
      {
        tokenURL: "https://www.arcgis.com/sharing/oauth2/token",
        authorizationURL: "https://www.arcgis.com/sharing/oauth2/authorize",
        ...options,
      },
      verify
    );
    this.name = "arcgis";
  }

  public userProfile(accessToken: string, done: VerifyCallback) {
    this._oauth2.get(this._userProfileURL, accessToken, function (err, body) {
      if (err) {
        return done(
          new InternalOAuthError("failed to fetch user profile", err)
        );
      }

      if (typeof body !== "string") {
        return done(
          new InternalOAuthError(
            `got a response body of type ${typeof body}. Expected type 'string'`,
            err
          )
        );
      }

      try {
        const json = JSON.parse(body);

        const profile: Profile = {
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
      } catch (err) {
        done(err);
      }
    });
  }
}

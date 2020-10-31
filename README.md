# Passport-ArcGIS

[Passport](http://passportjs.org/) strategy for authenticating with [ArcGIS](https://arcgis.com/)
using the OAuth 2.0 API.

This module lets you authenticate using ArcGIS in your Node.js applications.
By plugging into Passport, ArcGIS authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

`$ npm install passport-arcgis`

## Usage

#### Configure Strategy

The ArcGIS authentication strategy authenticates users using a ArcGIS account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

```ts
passport.use(new ArcGISStrategy({
    clientID: ARCGIS_CLIENT_ID,
    clientSecret: ARCGIS_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/arcgis/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ username: profile.username }, function (err, user) {
      return done(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'arcgis'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```ts
app.get('/auth/arcgis',
  passport.authenticate('arcgis'));

app.get('/auth/arcgis/callback', 
  passport.authenticate('arcgis', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
```

## License

[The MIT License](http://opensource.org/licenses/MIT)
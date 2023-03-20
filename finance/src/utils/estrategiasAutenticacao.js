const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        done(null, payload.id, { token });
      } catch (err) {
        done(err);
      }
    },
  ),
);

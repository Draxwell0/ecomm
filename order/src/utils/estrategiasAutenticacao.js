import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

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

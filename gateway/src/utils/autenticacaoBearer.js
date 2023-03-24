import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import blacklist from '../../redis/manipulaBlacklist.js';

async function verificaTokenNaBlacklist(token) {
  const tokenNaBlacklist = await blacklist.contemTokem(token);
  if (tokenNaBlacklist) throw new jwt.JsonWebTokenError('Token inválido por logout');
}

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verificaTokenNaBlacklist(token);
        const payload = jwt.verify(token, `${process.env.CHAVE_JWT}`);
        done(null, payload.id, { token });
      } catch (err) {
        done(err);
      }
    },
  ),
);

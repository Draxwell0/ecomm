import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new Error('Senha Inválida');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        // eslint-disable-next-line object-shorthand
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) throw new Error('Email inválido');

        await verificaSenha(senha, usuario.senha);

        done(null, usuario);
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        const usuario = await Usuario.findOne({ _id: payload.id });
        done(null, usuario, { token });
      } catch (err) {
        done(err);
      }
    },
  ),
);

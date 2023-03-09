import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const LocalStrategy = Strategy;

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

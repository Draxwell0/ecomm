import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
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
        const usuario = await Usuario.findOne({ email });
        if (!usuario) throw new Error('Email inválido');

        await verificaSenha(senha, usuario.senha);

        done(null, usuario);
      } catch (err) {
        done(err);
      }
    },
  ),
);

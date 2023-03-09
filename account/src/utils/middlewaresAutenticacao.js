import passport from 'passport';

export default {
  local: (req, res, next) => {
    passport.authenticate('local', { session: false }, (erro, usuario) => {
      if (erro) return res.status(400).json({ erro: `${erro.message} - Credenciais inválidas` });

      req.usuario = usuario;
      return next();
    })(req, res, next);
  },
};

import passport from 'passport';

export default (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (erro, payload, info) => {
    if (erro) return res.status(401).json({ erro: erro.message });

    req.token = info.token;
    req.usuario = payload.id;
    return next();
  })(req, res, next);
};

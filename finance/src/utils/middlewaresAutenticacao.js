const passport = require('passport');

module.exports = {
  bearer: (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (erro) => {
      if (erro) return res.status(401).json({ erro: erro.message });

      return next();
    })(req, res, next);
  },
};

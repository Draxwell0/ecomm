import passport from 'passport';

export default {
  bearer: (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err) => {
      if (err) return res.status(401).json({ erro: err.message });

      return next();
    })(req, res, next);
  },
};

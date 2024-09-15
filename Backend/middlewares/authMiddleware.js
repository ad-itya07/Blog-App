import passport from 'passport';

export const loginAuthenticate = passport.authenticate("local" , {
    successRedirect: '/auth/home',
    failureRedirect: '/login',
    failureMessage: 'Authentication failed!',
});

import passport from 'passport';

export const loginAuthenticate = passport.authenticate("local" , {
    successRedirect: '/auth/profile',
    failureMessage: 'Authentication failed!',
});

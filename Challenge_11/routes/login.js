const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        const { user } = req;
        let data = { user: user.email };
        res.render('home', data);
    }
});

router.post('/sign-in', passport.authenticate('sign-in', { successRedirect: '/', failureRedirect: '/errorlogin', }), (req, res) => {
    res.redirect('/');
});

router.get('/errorlogin', (req, res) => {
    res.render('errorlogin');
});

router.get('/logout', (req, res) => {
    res.render('logout');
});

router.post('/logout', (req, res) => {
    const { email } = req.body;
    req.logout((error) => {
        if (!error) {
            let data = { user: email};
            res.render('logout', data);
        } else {
            res.send('Ocurrio un  error', error.message);
        }
    });
});

module.exports = router;
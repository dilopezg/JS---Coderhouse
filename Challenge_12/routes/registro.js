const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/registro', (req, res, next) => {
    res.render('registro');
});

router.get('/errorregistro', (req, res) => {
    console.log(req);
    res.render('errorregistro');
});
router.post('/sign-up', passport.authenticate('sign-up', { successRedirect: '/', failureRedirect: '/errorregistro', }), (req, res) => {
    console.log(req);
    const { user } = req;
    console.log('registro -> user', user);
}
);


module.exports = router;
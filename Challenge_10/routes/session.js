const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {;
    if (!req.session.username)
        return res.redirect("/login");
    let { username } = req.session;
    const data = { username };
    res.render("home",data);
});

router.get("/login", (req, res) => {
    if (req.session.username)
        return res.redirect("/");
    res.render("login");
})

router.post("/login", (req, res) => {
    const { username } = req.body;
    req.session.username = username;
    res.redirect("/");
});

router.get("/logout", (req, res) => {
    const { username } = req.session;
    console.log(req.session);
    req.session.destroy((error) => {
        if (!error && username) {
            let data = { username };
            res.render("logout", data);
        } else {
            let message = error?.message || "El usuario no existe";
            let data = { message };
            res.render("error", data);
        }
    })
});

module.exports = router;

import * as express from 'express';
import * as path from 'path';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});



// This is the client ID and client secret that you obtained
// while registering the application
const clientID = "764794183083884546";
const clientSecret = "qskoeh4YUAc-yP2VzHyaJ9ntLPxgXH4S";

   

// Declare the redirect route
router.get("/oauth/redirect", (req, res) => {
    res.redirect("/redirect_cookiesave.html")
    //res.redirect(`/welcome.html`);
});

//Create Login Page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/login.html"));

});


export default router;
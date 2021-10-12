import express from "express";
import path from "path"
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/templates/index.html"));
  // res.render('index', { title: 'Express' });
});

router.get("/css/:filename", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/css/" + req.params.filename));
    // res.render('index', { title: 'Express' });
  });

module.exports = router;

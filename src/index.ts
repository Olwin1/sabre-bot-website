import express from "express";
import path from "path";
import net from "net";
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

router.get("/ts/:filename", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/client/" + req.params.filename));
  // res.render('index', { title: 'Express' });
});
router.get("/src/client/:filename", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../src/client/" + req.params.filename));
  // res.render('index', { title: 'Express' });
});




// Code For API


router.get("/api", (req, res, next) => {
  res.json({message: "hi :) tis a test..."});

});

























router.get("/socket", (req, res, next) => {
  const client =  new net.Socket();

  client.connect(63431, "localhost", () => {
    // tslint:disable-next-line:no-console
    console.log("Connected");
    const payload:JSON = {
      "data": "hi :) i'm a test",
    } as unknown as JSON
    client.write(JSON.stringify(payload));
  });

  client.on("data", (data) => {
    // tslint:disable-next-line:no-console
    console.log("Received: " + data);
    client.destroy(); // kill client after server's response
  });
  client.on("error", (exception) => {
    // tslint:disable-next-line:no-console
    console.log(exception);

  });
  res.send('yes.')
});

module.exports = router;

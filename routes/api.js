const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());

  let message = req.query.message;
  const lang = req.headers["x-lang"];
  console.log(lang);

  if (message == "") {
    res.status(400);
    if (lang == "en") {
      message = "message is empty.";
    } else {
      message = "messageの値が空です。";
    }
  }
  res.send({ message });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.end();
});

module.exports = router;
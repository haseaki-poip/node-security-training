const express = require("express");
const router = express.Router();

const allowOriginList = ["http://localhost:3000", "http://127.0.0.1:3000"];

router.use(express.json());
router.use((req, res, next) => {
  const origin = req.headers.origin;
  // Originヘッダが存在している、かつリクエストを許可するリスト内にOriginヘッダの値が含まれている
  if (origin && allowOriginList.includes(origin)) {
    // クロスオリジンからのリクエストを許可
    res.header("Access-Control-Allow-Origin", origin);
  }

  // プリフライトリクエストの時のみAccess-Control-Allow-Headersを追加するようにする。
  // プリフライトリクエストは基本的に初回のみ
  // プリフライトリクエストmethodにはOPTIONSが使われる
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Token");
  }
  next();
});

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());

  let message = req.query.message;
  const lang = req.headers["x-lang"];

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

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "hankyung-project.ckb8qirnyrnb.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "tkdwls1!",
  database: "hankyung_project",
});

// Login.js의 checkLogin에서 get
// 회원 정보 다 불러옴
// useid가 true인지 false인지를 통해 id확인을 하고
// 비밀번호도 일치한다면 sessionStorage.setItem("key",value)로 세션에 아이디값을 저장하게 된다
app.get("/api/login", (req, res) => {
  connection.query("SELECT * FROM addlogin", function (err, rows, fields) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
    // console.log(rows);
  });
});

// 이것들 필요없는거 같음

// app.get('/api/login/email',(req,res)=>{
//     connection.query('SELECT Email FROM addlogin', function(err,rows,fields){
//         res.header("Access-Control-Allow-Origin", "*");
//         res.send(rows)
//     })
// })

// AddLogin에서 useridCheck
// 회원가입 할 때 중복확인용 get
app.get("/api/login/userId", (req, res) => {
  connection.query("SELECT userId FROM addlogin", function (err, rows, fields) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
  });
});

// userIdCheck에서 id중복확인을 통해 setUsableID를 true/false를 정하고
// addlogin.js에서 handleFormSubmit에서 post
// usableID값이 true면 비밀번호 확인 후 맞으면 회원정보 넘겨받음
app.post("/api/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let sql = "INSERT INTO addlogin VALUES (?,?,?,?,?,?,?,?)";
  let userId = req.body.userId;
  let password = req.body.password;
  let name = req.body.name;
  let birthDate = req.body.birthDate;
  let email = req.body.email;
  let phoneNum = req.body.phoneNum;
  let major = req.body.major;
  let sex = req.body.sex;
  let params = [userId, password, name, birthDate, email, phoneNum, major, sex];
  connection.query(sql, params, (err, rows, fields) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
  });
});

// app.post('/api/login',(req,res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     let sql = 'INSERT INTO addlogin VALUES (?,?,?)';
//     let userId = req.body.userId
//     let PW = req.body.password
//     let Email = req.body.email
//     let params = [userId, PW, Email]
//     connection.query(sql, params,
//         (err, rows, fields) => {
//           res.header("Access-Control-Allow-Origin", "*");
//           res.send(rows);
//           console.log(err)
//           console.log(rows)
//     })
// })

// SELECT GROUP_CONCAT(, ":", type) AS hero_string FROM hero_collection;

// BoardRead.js의 boardRead에서 fetch
// 게시물 정보들 다 불러줌
app.get("/api/board", (req, res) => {
  connection.query("SELECT * FROM board", function (error, rows, fields) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
    console.log(rows);
  });
});

app.post("/api/board", (req, res) => {
  let sql = "INSERT INTO board VALUES (null,?,?,now(),?,?,?,?,?,?,?,?,?,?,?,?)";
  let title = req.body.title;
  let writer = req.body.writer;
  // let createDay = req.body.writer;

  let startProvince = req.body.startProvince;
  let startCity = req.body.startCity;
  let startDetail = req.body.startDetail;

  let arrivalProvince = req.body.arrivalProvince;
  let arrivalCity = req.body.arrivalCity;
  let arrivalDetail = req.body.arrivalDetail;

  let date = req.body.date;
  let time = req.body.time;

  let driver = req.body.driver;
  let maxPassenger = req.body.maxPassenger;
  let car = req.body.car;

  let content = req.body.content;

  let params = [
    title,
    writer,
    startProvince,
    startCity,
    startDetail,
    arrivalProvince,
    arrivalCity,
    arrivalDetail,
    date,
    time,
    driver,
    maxPassenger,
    car,
    content,
  ];
  console.log(req.body);
  connection.query(sql, params, (err, rows, fields) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
  });
});
app.get("/api/passenger/:title", (req, res) => {
  connection.query(
    "SELECT * FROM passenger WHERE title=?",
    req.params.title,
    function (error, rows, fields) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(rows);
    }
  );
});

app.post("/api/user/passenger", (req, res) => {
  let sql = "INSERT INTO passenger VALUES (?,?,?,?,?,?)";
  // 안되면 삭제
  // let boardId = req.body.boardId;
  let title = req.body.title;
  let userId = req.body.userId;
  let name = req.body.name;
  let phoneNum = req.body.phoneNum;
  let major = req.body.major;
  let sex = req.body.sex;
  let params = [title, userId, name, phoneNum, major, sex];
  connection.query(sql, params, function (error, rows, field) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
    // console.log(req.body);
  });
});

app.get("/api/board/user/:writer", (req, res) => {
  console.log(req.params.writer);
  connection.query(
    "SELECT * FROM board WHERE writer = ?",
    req.params.writer,
    function (error, rows, fields) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(rows);
    }
  );
});
app.delete("/api/board/user/:boardId", (req, res) => {
  console.log(req.params.boardId);
  connection.query(
    "DELETE FROM board WHERE boardId = ?",
    req.params.boardId,
    function (error, rows, fields) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(rows);
    }
  );
});
// passenger 어떻게 넘기는지 공부해야함.

app.listen(port, (req, res) => {
  console.log("서버 작동");
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const mysql = require('mysql');




app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors())

// 데이터베이스 연결
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sangjin',
    password: 'sangjin',
    port: '3306',
    database: 'carpooltaxi',
  });

// login할 때 회원 정보 다 불러오기
app.get('/api/login',(req,res)=>{
    const q = req.query.id;

    if (q){
        connection.query('SELECT * FROM users WHERE id=?', req.query.id, function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
          })
    }
    else{
        connection.query('SELECT * FROM users', function(err,rows,fields){
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows)
            console.log(rows)
            // console.log(rows);
        })
    }
})


// /api/login get 요청부분 수정
// 아이디 비밀번호 입력시 post 요청으로 보내어 아이디는 존재하는지, 비밀번호는 일치한지 확인
app.post('/api/login', (req, res) => {
    const { id, password: pw } = req.body;
  
    connection.query(
      'SELECT * FROM users WHERE id = ?',
      [id],
      (err, results, field) => {
        if (!results[0]) {
          return res.status(400).send('아이디가 존재하지 않습니다.');
        }
  
        if (results[0].password !== pw) {
          return res.status(400).send('비밀번호가 일치하지 않습니다.');
        }
  
        // 아이디와 비밀번호를 제외하고 프론트로 전송
        const { password, ...restResults } = results[0];
  
        return res.send(restResults);
      }
    );
  });

  // 회원가입 할 때 ID 중복확인용
app.get('/api/signup/id', (req, res) => {
  connection.query('SELECT id FROM users', function (err, rows, fields) {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(rows);
  });
});

// 회원가입 입력 정보를 post요청으로 보냄. 
app.post('/api/signup', async (req, res) => {
  const { id, password, name, birthDate, email, phoneNum, major, sex } =
    req.body;

  // 아이디 중복확인 후 회원가입 처리
  connection.query(
    'SELECT id FROM users WHERE id = ?',
    [id],
    (err, results, field) => {
      if (results[0]) {
        return res.status(400).send('이미 존재하는 아이디입니다.');
      }

      const sql = 'INSERT INTO users VALUES (?,?,?,?,?,?,?,?)';

      const params = [
        id,
        password,
        name,
        birthDate,
        email,
        phoneNum,
        major,
        sex,
      ];
      connection.query(sql, params, (err, results, fields) => {
        res.sendStatus(201); 
      });
    }
  );
});

// 회원가입 할 때 ID 중복확인용
app.get('/api/signup/id', (req, res) => {
    connection.query('SELECT id FROM users', function (err, rows, fields) {
      res.header('Access-Control-Allow-Origin', '*');
      res.send(rows);
    });
  });
  
  // 회원가입 입력 정보를 post요청으로 보냄. 
  app.post('/api/signup', async (req, res) => {
    const { id, password, name, birthDate, email, phoneNum, major, sex } =
      req.body;
  
    // 아이디 중복확인 후 회원가입 처리
    connection.query(
      'SELECT id FROM users WHERE id = ?',
      [id],
      (err, results, field) => {
        if (results[0]) {
          return res.status(400).send('이미 존재하는 아이디입니다.');
        }
  
        const sql = 'INSERT INTO users VALUES (?,?,?,?,?,?,?,?)';
  
        const params = [
          id,
          password,
          name,
          birthDate,
          email,
          phoneNum,
          major,
          sex,
        ];
        connection.query(sql, params, (err, results, fields) => {
          res.sendStatus(201); 
        });
      }
    );
  });


// 0---------

// // login할 때 회원 정보 다 불러오기
// app.get('/api/login',(req,res)=>{
//     connection.query('SELECT * FROM users', function(err,rows,fields){
//         res.header("Access-Control-Allow-Origin", "*");
//         res.send(rows)
//         console.log(rows)
//         // console.log(rows);
//     })
// })



// // 회원가입 할 때 ID 중복확인용
// app.get('/api/signup/id',(req,res)=>{
//     connection.query('SELECT userId FROM users', function(err,rows,fields){
//         res.header("Access-Control-Allow-Origin", "*");
//         res.send(rows)
//     })
// })


// // 회원가입 정보 추가
// app.post('/api/signup',(req,res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     let sql = 'INSERT INTO users VALUES (?,?,?,?,?,?,?,?)';
//     let id = req.body.userId
//     let password = req.body.password
//     let name = req.body.name
//     let birthDate = req.body.birthDate
//     let email = req.body.email
//     let phoneNum = req.body.phoneNum
//     let major = req.body.major
//     let sex = req.body.sex
//     let params = [id, password, name, birthDate, email, phoneNum, major, sex]
//     connection.query(sql, params,
//         (err, rows, fields) => {
//           res.header("Access-Control-Allow-Origin", "*");
//           res.send(rows);
//     })
// })


// carpool

// 전체 게시물 조회
app.get('/api/carpoolboard',(req,res)=>{
    const q = req.query.id;

    if (q){
        connection.query('SELECT * FROM carpoolBoard WHERE id=?', req.query.id, function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
        })
    }
    else{
        connection.query('SELECT * FROM carpoolBoard', function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
            // console.log(rows);
        })
    }
})


// 자신의 게시물 조회
app.get('/api/carpoolboard/:writer', (req,res)=>{
    connection.query('SELECT * FROM carpoolBoard WHERE writer = ?', req.params.writer, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})




// 해당 게시물 동승자 조회
app.get('/api/carpoolpassenger', (req,res)=>{
    const q = req.query.boardId;

    if (q){
        connection.query('SELECT * FROM carpoolPassenger WHERE boardId=?',req.query.boardId, function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
        })
    }
    else{
        connection.query('SELECT * FROM carpoolPassenger', function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
            // console.log(rows);
        })
    }
})

// 게시물 수정
app.put('/api/carpoolboard/:id', (req,res)=>{
    let sql = 'UPDATE INTO carpoolBoard SET title=?, writer=?, startProvince=?, startCity=?, startDetail=?, arrivalProvince=?, arrivalCity=?, arrivalDetail=?, date=?, time=?, driver=?, maxPassenger=?, car=?, content=? WHERE id=?'
    let title = req.body.title;
    let writer = req.body.writer;

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

    let id = req.body.id;

    let params = [title,writer,startProvince,startCity,startDetail,arrivalProvince,arrivalCity,arrivalDetail,date,time,driver,maxPassenger,car,content, id]
    connection.query(sql, params, (err,rows,fields)=>{
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rows);
        console.log(rows);
    })
})

// 게시물 추가
app.post('/api/carpoolboard', (req,res)=>{
    console.log(req.body);
    let sql = 'INSERT INTO carpoolBoard VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    let title = req.body.title;
    let writer = req.body.writer;

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

    let params = [title,writer,startProvince,startCity,startDetail,arrivalProvince,arrivalCity,arrivalDetail,date,time,driver,maxPassenger,car,content]
    connection.query(sql, params, (err,rows,fields)=>{
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rows);
        console.log(rows);
    })
})

// 게시글 동승자 추가
app.post('/api/carpoolpassenger', (req,res)=>{
    console.log(req.body);
    let sql = 'INSERT INTO carpoolPassenger VALUES (?,?,?)'
    let id = req.body.id;
    let boardId = req.body.boardId;
    let userId = req.body.userId;
    
    let params = [id, boardId, userId]
    connection.query(sql, params, function(error, rows, field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
        console.log(rows);
    })
    
})

// 게시글 삭제
app.delete('/api/carpoolboard/:id', (req, res)=>{
    console.log(req.params.id)
    connection.query('DELETE FROM carpoolBoard WHERE id = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
        console.log(rows);
      })
})

// 게시글 동승자 삭제
app.delete('/api/carpoolpassenger/:id', (req, res)=>{
    console.log(req.params.id)
    connection.query('DELETE FROM carpoolPassenger WHERE id = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
        console.log(rows)
      })
})


// 택시 (driver, car 제외하고 구현하면 됨, 그리고 신청할 때 무조건 동승자임)

// 전체 게시물 조회
app.get('/api/taxiboard',(req,res)=>{
    const q = req.query.id;

    if (q){
        connection.query('SELECT * FROM taxiBoard WHERE id=?', req.query.id, function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
        })
    }
    else{
        connection.query('SELECT * FROM taxiBoard', function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
            console.log(rows);
        })
    }
})


// 자신의 게시물 조회
app.get('/api/taxiboard/:writer', (req,res)=>{
    connection.query('SELECT * FROM taxiBoard WHERE writer = ?', req.params.writer, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

// 해당 게시물 동승자 조회
app.get('/api/taxipassenger', (req,res)=>{
    const q = req.query.boardId;

    if (q){
        connection.query('SELECT * FROM taxiPassenger WHERE boardId=?',req.query.boardId, function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
        })
    }
    else{
        connection.query('SELECT * FROM taxiPassenger', function (error, rows, fields) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);
            console.log(rows);
        })
    }
})

// 게시물 추가
app.post('/api/taxiboard', (req,res)=>{
    let sql = 'INSERT INTO taxiBoard VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?)';
    let title = req.body.title;
    let writer = req.body.writer;

    let startProvince = req.body.startProvince;
    let startCity = req.body.startCity;
    let startDetail = req.body.startDetail;

    let arrivalProvince = req.body.arrivalProvince;
    let arrivalCity = req.body.arrivalCity;
    let arrivalDetail = req.body.arrivalDetail;

    let date = req.body.date;
    let time = req.body.time;

    let maxPassenger = req.body.maxPassenger;
    
    let content = req.body.content;

    let params = [title,writer,startProvince,startCity,startDetail,arrivalProvince,arrivalCity,arrivalDetail,date,time,maxPassenger,content]
    console.log(req.body)
    connection.query(sql, params, (err,rows,fields)=>{
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rows);
    })
    
})

// 게시글 동승자 추가
app.post('/api/taxipassenger', (req,res)=>{
    let sql = 'INSERT INTO taxiPassenger VALUES (?,?,?)'
    let id = req.body.id;
    let boardId = req.body.boardId;
    let userId = req.body.userId;
    
    let params = [id, boardId, userId]
    connection.query(sql, params, function(error, rows, field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})

// 게시글 삭제
app.delete('/api/taxiboard/:id', (req, res)=>{
    console.log(req.params.boardId)
    connection.query('DELETE FROM taxiBoard WHERE id = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
        console.log(rows);
      })
})

// 동승자 삭제
app.delete('/api/taxipassenger/:id', (req, res)=>{
    console.log(req.params.id)
    connection.query('DELETE FROM taxiPassenger WHERE id = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
        console.log(rows)
      })
})

app.listen(port, (req,res)=>{
    console.log("서버 작동")
})
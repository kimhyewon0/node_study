var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

//connection 정보를 만들어서 mysql을 express를 이용하여 사용 할 수 있도록 해주는 코드 -> mysql이 이 프로젝트에 설치해줘야함
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'ghen0910',
    database : 'userdb'
})
// express에서 mysql연동하여 클라이언트에 연락을 주는방법

// connection 관련된 객체정보를 받는데 그게 connect함수 안에 있음
connection.connect()

app.listen(3000, function() {
	console.log("start!!!! express server on port 3000!");
});

// 요청받는대로 바로 등록되도록 만들기
// express, static이라는 함수에 디렉토리 public을 넣어줄테니 등록해
app.use(express.static('public'))

//body-parser 사용하기
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) //인코딩된 url
//클라이언트와 서버가 데이터를 주고받을 때 한글이나 특수문자를 제대로 받을 수 있도록 하는 것
app.set('view engine', 'ejs') //view engine은 ejs라는 것을 알려주는 코드


// url 라우팅으로 get요청에 대해 응답값을 파일단위로 전송
app.get('/', function(req, res){
    //res.send('<h1>hi!! send data</h1>')
    console.log('test');
    res.sendFile(__dirname + "/public/main.html");
})


// localhost:3000/main 이라고 해도 페이지가 뜨게해줘!
app.get('/main', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
})


//post 방식으로 파일 전송받기
app.post('/email_post', function(req, res){
    // get : req.param('email')
    // post : 이렇게해서는 받을 수 없고 콘솔을 설치해야함(body-parser)
    console.log(req.body.email)
    //res.send("hello, " + req.body.email)
    
    // 템플릿 엔진을 이용해서 화면에 표시하기
    // 'express view engine'을 검색하기
    // 응답값을 줄 때 render를 사용해서 데이터와 html이 결합 된 상태로 클라이언트에게 전달할 수 있음 
    res.render('email.ejs', {'email' : req.body.email})
})


//이메일 정보가 실제 db에 있는지 확인하고, 있으면 name을 반환
app.post('/ajax_send_email', function(req, res){
    var email = req.body.email;
    var responseData = {};
    
    // 쿼리날리기 -> db 접속
    var query = connection.query('select name from user where email="' + email + '"', function(err, rows){
        if(err) throw err;
        if(rows[0]){
            //rows[0]에 데이터가 있을 경우
            
            //테스트용
            console.log(rows[0]);
            
            responseData.result = 'ok';
            responseData.name = rows[0].name;
        }
        else{
//            console.log('none : ' + rows[0])
            responseData.result = 'fail';
            responseData.name = '';
        }
        res.json(responseData)
        
    })
});

//클라이언트 innerHTML로 결과값을 받아 파싱하여 넣었음
//서버에서는 결과값을 잘 줘서 응답값을 보냈고
//Json 형태로 데이터를 넣어서 표현하는 것을 했음

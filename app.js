var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

// url 라우팅으로 get요청에 대해 응답값을 파일단위로 전송
app.get('/', function(req, res){
    //res.send('<h1>hi!! send data</h1>')
    res.sendFile(__dirname + "/public/main.html")
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
    res.send("post_response")
})
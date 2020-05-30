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
app.set('view engine', 'ejs') //view engine은 ejs라는 것을 알려주는 코드



//post 방식으로 파일 전송받기
app.post('/search_post', function(req, res){
    // get : req.param('email')
    // post : 이렇게해서는 받을 수 없고 콘솔을 설치해야함(body-parser)
    console.log(req.body.search)
    //res.send("hello, " + req.body.email)
    
    // 템플릿 엔진을 이용해서 화면에 표시하기
    // 'express view engine'을 검색하기
    // 응답값을 줄 때 render를 사용해서 데이터와 html이 결합 된 상태로 클라이언트에게 전달할 수 있음 
    res.render('search.ejs', {'search' : req.body.search})
})


// 클라이언트에 있는 form을 json 형태로 만들어서 send로 보냈고,
// post로 보내고 받은 정보를 '/ajax_send_email'이 url로 라우팅해서 express가 모니터링 하고 있다가
// console 찍고 결과값을 포함하여 입력값을 잘 표현된 것을 보여주는 코드
app.post('/ajax_send_search', function(req, res){
    console.log(req.body.search);
    // input value에 대한 check validation ==> "select db"하는 것을 의미
    var responseData = {'result' : 'ok', 'search' : req.body.search};
    res.json(responseData)
});
// 파일이 새로 생기면 무조건 localhost:3000/main.js 를 요청함
// 처리를 안해줬으니까 404 오류가 발생함

// js : static 파일, 바로 서버에서 요청받는대로 처리해주는게 좋음
// -> static dir를 express에 등록하면 가능!

console.log("main js loaded")
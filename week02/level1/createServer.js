const http = require('http'); // 기본 모듈

// 서버 생성
http.createServer((req, res) => {
    // 여기에 서버에서 보내줄 것을 작성
    res.write('<h1> Hello Server Part </h1>');
    res.end('<p> Server Love </p>');
}).listen(8080, () => {
    console.log('8080번에서 서버 대기중!');
});

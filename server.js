const express = require('express');
const request = require('request');
const http = require('http');
const app = express();
let path = require('path');
let server = http.createServer(app);

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, response) {
    let requestUrl = "https://api.odsay.com/v1/api/searchPubTransPathT" + 
"?SX=127.0739547&SY=37.2407701&EX=126.921666&EY=37.1308333&apiKey=D5/cqOgLNnn/iHrOs3rXewYFNPO6KVQvntHKQ/5muGA"
    request.get(requestUrl, (err, res, body) => {
        if (err) {
            console.log(`err => ${err}`)
        }
        else {
            if (res.statusCode == 200) {
                var result = body
                var obj = JSON.parse(result);
                //console.log(`body data => ${result}`)
                //console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ')
                var timev = (obj)["result"]["path"][0].info.totalTime
                response.render('index', {time: timev});
                var payv = (obj)["result"]["path"][0].info.payment
                response.render('index', {pay: payv});
                var distancev = (obj)["result"]["path"][0].info.totalDistance
                response.render('index', {distance: distancev});
                console.log(timev) // 분단위?
                console.log(payv)
                console.log(distancev) // m
            }
        }
    })
});

server.listen('3000', 'localhost', function () {
    console.log('server listen on port:' + server.address().port);
})

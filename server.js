const express = require('express');
const request = require('request');
const http = require('http');
const app = express();
var bodyParser = require("body-parser");
let path = require('path');
let server = http.createServer(app);

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended : false }));

request.post("/", function(req, res){
    //let sxv = req.render(sx)
    //let syv = req.render(sy)
    //let exv = req.render(ex)
    //let eyv = req.render(ey)
});

app.get('/', function (req, response) {
    let requestUrl = "https://api.odsay.com/v1/api/searchPubTransPath?SX=127.0739547&SY=37.2407701&EX=126.921666&EY=37.1308333&apiKey=D5/cqOgLNnn/iHrOs3rXewYFNPO6KVQvntHKQ/5muGA"
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
                var time = (obj)["result"]["path"][0].info.totalTime
                var pay = (obj)["result"]["path"][0].info.payment
                var distance = (obj)["result"]["path"][0].info.totalDistance
                response.render('index', {
                    time: time,
                    pay: pay,
                    distance: distance
                });
            }
        }
    })
});

server.listen('3000', 'localhost', function () {
    console.log('server listen on port:' + server.address().port);
})

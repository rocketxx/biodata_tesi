const express = require('express');
const { response } = require('express');
const test = require('./splitjson');
const { splitdata } = require('./splitjson');
const app = express();

app.use(express.json());
var datijson = {
    "id":"b8:27:eb:01:02:03",
    "sensors":[
       {
          "id":"485fcba0-e61a-11df-9492-0800200c9a66",
          "type":"sun temp",
          "value":0.77
       },
       {
        "id":"55555-e61a-11df-9492-0800200c9a66",
        "type":"bagnatura fogliare",
        "value":1.22
     }
    ],
    "ts":"2022-03-15T17:14:15Z"
 }


app.post('/newvalue', function(request, response){
    let myJson = request.body;      //JSON contenuto nel corpo della richiesta
    response.send(myJson);	 // echo the result back
    splitdata(myJson); //splitta i dati,manda a client che li invia

});

app.get('/', function(request, response){
    response.send('ciao william');	 // echo the result back
});



const port = process.env.PORT || 3030;
app.listen(port, () => console.log('Listening on port: '+ port));
# biodata_tesi
 Tesi, corso di laurea in computer science
 
 -installare express
 -usa postman:
 -url: http://localhost:3030/newvalue
 json:
 
 
 {
    "id":"b8:27:eb:01:02:03",
    "sensors":[
       {
          "id":"39c98749-b235-4bb5-be7b-dc534eadc2ee",
          "type":"temperature",
          "value":12
       },
       {
          "id":"39c98749-b235-4bb5-be7b-dc534eadc2ee",
          "type":"lux",
          "value":90
       }
    ],
    "ts":"2022-03-23T17:20:15Z"
 }



ps:
attenzione alla data, dovresti inviarla con uno'ora prima dell'orario attuale e poi configurare utc+1 in grafana

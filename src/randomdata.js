const test = require('./fakeclient');
const { sendata } = require('./fakeclient');
const sleep = require('util').promisify(setTimeout)
const { esclient, type } = require("./elastic");
  
// {
         //feature future per gestire molti campi, prendo il nome dal json che arriva 
        //cambiare indice dinamicamente:
        //potre mettere un index.replace("test",[sensortype_array[tipo-1]])
        //dopo aver inviato  metto un index.replace([sensortype_array[tipo-1]], "test")
    // }

sensortype_array = ['lux','temperature','humidity','soil_water','soil_nitrogen','soil_salt','anemometer','wind_direction','soil_temperature']
sensorid_array = ['485fcba0-e61a-11df-9492-0800200c9a66','f191e4dd-9e91-4d52-ba40-66617a9b4651','485fcba0-e61a-11df-9492-0800200c9a66','78ffa3df0-d29b-11df-6702-903270e5a78','78ffa3df0-d29b-11df-6702-903270e5a78','485fcba0-e61a-11df-9492-0800200c9a66','485fcba0-e61a-11df-9492-0800200c9a66','78ffa3df0-d29b-11df-6702-903270e5a78','78ffa3df0-d29b-11df-6702-903270e5a78']
arduinoid = ['b8:27:eb:01:02:03','b9:28:ww:02:03:04'] //random 1,2 = x-1

coordinate = ['50.0338, 36.2242','70.0338, 66.2242'];
nome_campo = ['campoZucchine','campoPomodori']
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

//id_arduino,id_sensor,sensor_type,sensor_value,date
function send_now()
{
    const tipo = randomIntFromInterval(1, 9)
    const id_ = randomIntFromInterval(1, 2)
    const  value = randomIntFromInterval(0, 100)
    const id_coord = randomIntFromInterval(1,2);

 //li manda all'indice principale settato in elastic.js
    sendata(arduinoid[id_-1],sensorid_array[tipo-1],sensortype_array[tipo-1],value,Date.now(),nome_campo[id_coord-1],coordinate[id_coord-1])
    //sendata('b8:27:eb:01:02:03','f191e4dd-9e91-4d52-ba40-66617a9b4651','temperature',value,Date.now())
 
 //li manda all'indice settato in "index" in questo file   
    insertNewvalue(arduinoid[id_-1],sensorid_array[tipo-1],sensortype_array[tipo-1],value,Date.now(),nome_campo[id_coord-1],coordinate[id_coord-1])
    //insertNewvalue('b8:27:eb:01:02:03','f191e4dd-9e91-4d52-ba40-66617a9b4651','temperature',value,Date.now().toISOString())
    //console.log(arduinoid[id_-1]+ " " + sensorid_array[tipo-1]+ " " +sensortype_array[tipo-1]+ " " +value+ " " +tmp2.replace('T',''))
  }

function send_more_data()
{ 
    setInterval(send_now, 3000);
}

const index="test"; //


async function insertNewvalue(id_arduino, id_sensor,sensor_type,sensor_value,date,name_field,location) {
  return esclient.index({
    index,  //index non può essere cambiato tipo index=>indicemio ecc
    type,
    body: {
      id_arduino,
      id_sensor,
      sensor_type,
      sensor_value,
      date,
      name_field,
      location
    }
  })
}

///export 
// module.exports.send_more_data = send_more_data;
send_more_data();




    const { header } = require("express/lib/request");
    const http = require("http")
function sendata(id_arduino,id_sensor,sensor_type,sensor_value,date,name_field,location)
{
    var obj =   {
        "id_arduino": `${id_arduino}`,
        "id_sensor": `${id_sensor}`,
        "sensors_type": `${sensor_type}`,
        "sensor_value":`${sensor_value}`,
        "date": `${date}`,
        "name_field": `${name_field}`,
        "location":  `${location}`
      }
    console.log(obj)
//da problemi loki in bbase al ts, controllare bene 

    const data = JSON.stringify(obj)

    const options = {
        hostname:'localhost', 
        port: 3000,
        path: '/biodata/new',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

   
    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      });
      
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      
      // Write data to request body
      req.write(data);
      req.end();

}


      module.exports.sendata = sendata;
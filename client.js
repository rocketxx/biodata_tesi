
    const { header } = require("express/lib/request");
    const http = require("http")
function sendata(value,ts,source,job,host)
{
    // var value = 'test'
    // var ts = '2022-03-15T08:14:15Z'
    // var source ='william'
    // var job = 'williamJob'
    // var host = 'williamHost'

    var labels = get_labels(source,job,host)

    var obj = { "streams": [ { "labels": `${labels}`, "entries": [{ "ts": `${ts}`, "line":`${value}`}] } ] }

    console.log(obj)
//da problemi loki in bbase al ts, controllare bene 

    const data = JSON.stringify(obj)

    const options = {
        hostname:'loki', 
        port: 3100,
        path: '/api/prom/push',
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
      function get_labels(source_,job_,host_)
      {
        var tmp = '{source="api",job="simplejob", host="simplehost"}'
        tmp = tmp.replace("api",source_)
        tmp = tmp.replace("simplejob",job_)
        tmp = tmp.replace("simplehost",host_)
        return tmp
      }

      module.exports.sendata = sendata;
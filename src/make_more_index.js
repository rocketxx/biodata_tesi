const elastic = require("./elastic");
const { esclient, type } = require("./elastic");
for(let i = 0; i < 1; i++)
{
    (async function main() {

        const isElasticReady = await elastic.checkConnection();
      
        if (isElasticReady) {
      
          const elasticIndex = await elastic.esclient.indices.exists({index: elastic.index});
      
          sensortype_array = ['lux','temperature','humidity','soil_water','soil_nitrogen','soil_salt','anemometer','wind_direction','soil_temperature']

            await elastic.createIndex("test");
            await setMapping();
           // await data.populateDatabase()
          
      
          //server.start();
      
        }
      
      })();

}

async function setMapping () 
{
  try {
    const schema = {
      id_arduino: {
        type: "text" 
      },
      id_sensor: {
        type: "text"
      },
      sensors_type:{
        type: "text"
      },
      sensor_value:{
        type: "integer"
      },
      date:{
        "type":   "date"
      },
      name_field : { "type" : "text" },
      location : { "type" : "geo_point"}
      
    };
 

var index = "test"

    await esclient.indices.putMapping({ 
      index, 
      type,
      include_type_name: true,
      body: { 
        properties: schema 
      } 
    })
    
    console.log(" mapping... created successfully");
  
  } catch (err) {
    console.error("An error occurred while setting  mapping:");
    console.error(err);
  }
}



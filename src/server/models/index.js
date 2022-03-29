const { esclient, index, type } = require("../../elastic");



async function insertNewValues(id_arduino, id_sensor,sensor_type,sensor_value,date,name_field,location) {
  return esclient.index({
    index,
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


module.exports = {
  insertNewValues
}
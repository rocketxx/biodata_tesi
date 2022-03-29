const model = require("../models");

/**
 * @function getQuotes
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

// async function getQuotes(req, res) {
//   const query  = req.query;

//   if (!query.text) {
//     res.status(422).json({
//       error: true,
//       data: "Missing required parameter: text"
//     });

//     return;
//   }

//   try {

//     const result = await model.getQuotes(req.query);
//     res.json({ success: true, data: result });

//   } catch (err) {
//     res.status(500).json({ success: false, error: "Unknown error."});
//   }
// }

/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function addValue(req, res) {

  const body = req.body;

  if (!body.id_arduino || !body.id_sensor) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter(s): 'id_arduino' or 'id_sensor'"
    });

    return;
  }

  try {

    const result = await model.insertNewValues(body.id_arduino, body.id_sensor,body.sensors_type,body.sensor_value,body.date);
    res.json({ 
      success: true, 
      data: {
        id:     result.body._id,
        id_arduino: body.id_arduino,
        id_sensor:  body.id_sensor,
        sensor_type: body.sensor_type,
        sensor_value: body.sensor_value,
        date: body.date
      } 
    });

  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }

}

module.exports = {
  addValue
};
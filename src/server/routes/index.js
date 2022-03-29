const express    = require("express");
const controller = require("../controllers");
const routes     = express.Router();

//routes.route("/").get(controller.getQuotes);
routes.route("/new").post(controller.addValue);
//inserire in controllers/index.js, una funzione addManyValue(esportala), che li prende e invia a splitjson che si uccupa di 
//splittarli e inviarli 
module.exports = routes;
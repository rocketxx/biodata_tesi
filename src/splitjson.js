function splitdata(dati)
{
   let id_ = dati.id;
   let ts_ = dati.ts;
   let globalarray = [];
   
   for (key in dati.sensors)
   {
      globalarray[key]=dati.sensors[key];
   };
   let len = globalarray.length;
   for(var i = 0; i < len; i++)
   {
     // value,ts,source,job,host
     //richiama funzioni  sendata da fakeclient.js e sendNewValue da randomdata.js
     //prima di inviare, bisogna sceglire l'indice a cui inviare quindi controlli if e invio
     //aggiungere field_name e coordinates
      console.log("invio: " + globalarray[i].value + " ",globalarray[i].id + " ",globalarray[i].type+ " ",id_+ " ",ts_);
      sendata(globalarray[i].value,ts_,id_,globalarray[i].type,globalarray[i].id);
   }
   
}

module.exports.splitdata = splitdata;

# Biodata Tesi

> Progetto di tesi per il corso di laurea in Computer Science — Pipeline per la raccolta, l'indicizzazione e la visualizzazione di dati biometrici provenienti da sensori IoT, basata su **Node.js**, **Elasticsearch** e **Kibana**, orchestrata con **Docker Compose**.

## Panoramica

Il sistema simula (e predispone la ricezione reale da) una rete di sensori Arduino collegati a campi agricoli. I dati dei sensori — luminosità, temperatura, umidità, composizione del suolo, vento e altri — vengono inviati tramite API REST a un backend Express che li indicizza in Elasticsearch. Kibana viene utilizzato come dashboard per l'analisi e la visualizzazione in tempo reale.

### Architettura

```
Sensori / Fake Client ──► API Express (Node.js :3000)
                                │
                                ▼
                         Elasticsearch (:9200)
                                │
                                ▼
                           Kibana (:5601)
```

## Prerequisiti

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- (Opzionale) Node.js ≥ 10 se si vuole eseguire il progetto senza Docker

## Avvio rapido

```bash
# 1. Clonare il repository
git clone https://github.com/rocketxx/biodata_tesi.git
cd biodata_tesi

# 2. Avviare tutti i servizi
docker-compose up --build
```

Una volta avviato, i servizi saranno raggiungibili ai seguenti indirizzi:

| Servizio        | URL                          |
|-----------------|------------------------------|
| API Node.js     | http://localhost:3000         |
| Elasticsearch   | http://localhost:9200         |
| Kibana          | http://localhost:5601         |

## Struttura del progetto

```
biodata_tesi/
├── docker-compose.yml        # Orchestrazione dei container
├── Dockerfile                # Immagine Node.js per l'API
├── package.json
├── kibana/
│   ├── Dockerfile
│   └── kibana.yml            # Configurazione Kibana
└── src/
    ├── main.js               # Entry point: connessione a ES, creazione indice e avvio server
    ├── elastic.js             # Client Elasticsearch, mapping e gestione indice "biodata"
    ├── fakeclient.js          # Simulazione invio dati tramite richieste HTTP POST
    ├── randomdata.js          # Generazione periodica di dati casuali per 9 tipi di sensore
    ├── splitjson.js           # Parsing e smistamento di payload JSON multi-sensore
    ├── make_more_index.js     # Utility per creare indici aggiuntivi ("test")
    ├── data/
    │   └── quotes.json        # Dati di esempio (dal progetto originale)
    └── server/
        ├── index.js           # Configurazione Express (CORS, body-parser, routing)
        ├── routes/index.js    # Definizione rotte: POST /biodata/new
        ├── controllers/index.js  # Logica di validazione e risposta
        └── models/index.js    # Inserimento documenti in Elasticsearch
```

## API

### `POST /biodata/new`

Inserisce un nuovo valore di sensore nell'indice Elasticsearch.

**Body (JSON):**

```json
{
  "id_arduino": "b8:27:eb:01:02:03",
  "id_sensor": "f191e4dd-9e91-4d52-ba40-66617a9b4651",
  "sensors_type": "temperature",
  "sensor_value": 25,
  "date": 1648300000000,
  "name_field": "campoZucchine",
  "location": "50.0338, 36.2242"
}
```

**Campi obbligatori:** `id_arduino`, `id_sensor`

**Risposta (200):**

```json
{
  "success": true,
  "data": {
    "id": "<elasticsearch_doc_id>",
    "id_arduino": "b8:27:eb:01:02:03",
    "id_sensor": "f191e4dd-9e91-4d52-ba40-66617a9b4651",
    "sensor_type": "temperature",
    "sensor_value": 25,
    "date": 1648300000000
  }
}
```

## Schema dati Elasticsearch

L'indice `biodata` utilizza il seguente mapping:

| Campo           | Tipo        | Descrizione                          |
|-----------------|-------------|--------------------------------------|
| `id_arduino`    | text        | MAC address della scheda Arduino     |
| `id_sensor`     | text        | UUID del sensore                     |
| `sensors_type`  | text        | Tipo di sensore (es. temperature)    |
| `sensor_value`  | integer     | Valore rilevato                      |
| `date`          | date        | Timestamp della rilevazione          |
| `name_field`    | text        | Nome del campo agricolo              |
| `location`      | geo_point   | Coordinate geografiche del sensore   |

### Tipi di sensore supportati

`lux`, `temperature`, `humidity`, `soil_water`, `soil_nitrogen`, `soil_salt`, `anemometer`, `wind_direction`, `soil_temperature`

## Generazione dati di test

Il modulo `randomdata.js` genera e invia automaticamente dati casuali ogni 3 secondi, simulando letture da 9 tipi di sensore distribuiti su due campi agricoli (`campoZucchine` e `campoPomodori`). Per attivarlo:

```bash
node src/randomdata.js
```

## Stack tecnologico

- **Node.js** 10 + Express 4
- **Elasticsearch** 8.1.2
- **Kibana** 8.1.2
- **PM2** (process manager in produzione)
- **Docker / Docker Compose**

## Licenza

Distribuito con licenza [MIT](LICENSE.md).

---

*Progetto di tesi — Corso di laurea in Computer Science*

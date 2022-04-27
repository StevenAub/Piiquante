const password = process.env.DB_PASSWORD;
const userName = process.env.DB_USER;
const clusterDB = process.env.DB_CLUSTER;
//Connexion a mongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${userName}:${password}@piiquante.2n2ap.mongodb.net/${clusterDB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !" + error));

module.exports = { mongoose };

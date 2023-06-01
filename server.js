const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routes/auth-routes");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use(router)


mongoose.connect("mongodb://mongo:FXeqSCKeBcblQ4dbkUuP@containers-us-west-26.railway.app:6778", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    app.listen(8000, () => {
      console.log("Servidor iniciado en el puerto 8000");
    });
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos:", error);
  });
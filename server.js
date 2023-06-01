const mongoose = require("mongoose");
const express = require("express");
<<<<<<< HEAD
=======
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const dotenv = require("dotenv");
dotenv.config();

>>>>>>> e53f143411af91aadb968a96786aea1c9ceada8b
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routes/auth-routes");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use(router)

<<<<<<< HEAD

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
=======
const PORT = process.env.PORT || 8000;

const uri = mongoose
  .connect("mongodb://mongo:FXeqSCKeBcblQ4dbkUuP@containers-us-west-26.railway.app:6778")
  .then(() => console.log("db started"));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
>>>>>>> e53f143411af91aadb968a96786aea1c9ceada8b

const router = require("./routes/auth-routes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(express.json());

app.use(cors());
app.use(router);

const PORT = process.env.PORT || 8000;

const uri = mongoose
  .connect("mongodb://mongo:FXeqSCKeBcblQ4dbkUuP@containers-us-west-26.railway.app:6778")
  .then(() => console.log("db started"));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

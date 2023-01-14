const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
require("dotenv").config()

const app = express()

//cors
const cors = require("cors");
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//capturar body
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//conexion a base de datos

const option = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL, option)
    .then(() => console.log("Base de datos conectada"))
    .catch(e => console.log("error db: ", e))

//import de routes
const authRoutes = require("./routes/auth");
const validaToken = require("./routes/validate-token");
const admin = require("./routes/admin");

// route middleware
app.use("/api/user", authRoutes);
app.use("/api/admin", validaToken, admin)
app.get("/", (req, res) => {
    res.json({
        estado: true,
        mensaje: "funciona!"
    })
});

//iniciar server

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en: ${PORT}`);
})
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Asegura que Express pueda leer JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Permite manejar formularios

// Conectar a MongoDB antes de definir las rutas
mongoose.connect("mongodb://localhost:27017/gdiic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Definir las rutas después de conectar a la BD
app.use("/api/auth", require("./routes/authRoutes"));

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("🚀 API de GDIIC funcionando correctamente");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en: http://localhost:${PORT}`);
});

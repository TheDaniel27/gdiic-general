const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Lista de matrículas/nóminas permitidas
const allowedUsers = {
    Docente: ["D12345", "D67890", "1234", "1235", "1236", "1237", "1238", "1239"],
    Estudiante: ["E54321", "E09876", "3211", "3212", "3213", "3214", "3215", "3216"],
};


// Ruta para registrar un usuario
// Ruta para registrar un usuario
router.post("/register", async (req, res) => {
    const { role, name, email, idNumber, password } = req.body;

    if (!allowedUsers[role] || !allowedUsers[role].includes(idNumber)) {
        return res.status(400).json({ message: "Matrícula/Nómina no autorizada" });
    }

    try {
        // ✅ Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "El usuario ya está registrado" });

        // ✅ Guardamos el usuario en la base de datos
        const newUser = new User({ role, name, email, idNumber, password });
        await newUser.save();

        console.log("✅ Usuario registrado en la base de datos:", newUser);

        // ✅ Enviamos el usuario completo, incluyendo el `_id`
        res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });

    } catch (error) {
        console.error("❌ Error al registrar el usuario:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
});


// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        if (user.password !== password) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        res.json({ message: "Inicio de sesión exitoso", user });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});

//Para Actualizar los datos
router.put("/update/:id", async (req, res) => {
    const { name, email } = req.body; // ✅ Recibimos nombre y correo

    try {
        const updateFields = {}; // ✅ Solo actualizamos los campos que se envíen

        if (name) updateFields.name = name; // Si hay nombre, lo actualizamos
        if (email) updateFields.email = email; // Si hay correo, lo actualizamos

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateFields, // ✅ Solo actualiza los campos enviados
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado con éxito", user: updatedUser });
    } catch (error) {
        console.error("❌ Error al actualizar el usuario:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
});

router.get("/user-data", async (req, res) => {
    try {
        const userId = req.query.id; // 📌 Asegurar que el frontend envía el ID correcto
        if (!userId) return res.status(400).json({ message: "ID de usuario requerido" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json(user);
    } catch (error) {
        console.error("❌ Error al obtener datos del usuario:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
});



router.put("/update-password/:id", async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        console.log("🔍 Recibiendo solicitud de cambio de contraseña...");
        console.log("🆔 ID recibido:", req.params.id);
        console.log("🔑 Contraseña actual:", currentPassword);
        console.log("🔒 Nueva contraseña:", newPassword);

        if (!req.params.id) {
            return res.status(400).json({ message: "ID del usuario requerido" });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            console.error("❌ Usuario no encontrado en la base de datos.");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que la contraseña actual sea correcta (SIN encriptar)
        if (user.password !== currentPassword) {
            console.error("🚫 La contraseña actual no coincide.");
            return res.status(400).json({ message: "Contraseña actual incorrecta" });
        }

        // Actualizar la contraseña en la base de datos
        user.password = newPassword;
        await user.save();

        console.log("✅ Contraseña actualizada correctamente en la base de datos.");
        res.json({ message: "Contraseña actualizada con éxito", user });
    } catch (error) {
        console.error("❌ Error en el servidor al actualizar la contraseña:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
});



module.exports = router;

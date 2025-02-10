const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: ["Docente", "Estudiante"], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idNumber: { type: String, required: true, unique: true }, // Matrícula o Nómina
    password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

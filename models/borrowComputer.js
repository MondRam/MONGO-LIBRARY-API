import mongoose from "mongoose";

const BorrowComputerSchema = new mongoose.Schema({
    correo: {type: String, required: true,},
    nombre: {type: String, required: true,},
    carrera: {type: String},
    ip: {type: String, required: true},
    hora_entrega: {type: Date, required: true},
    hora_devolucion: {type: Date},
    notas: {type: String},

}, {timestamps: true});

const BorrowComputerModel = mongoose.model('BorrowComputer', BorrowComputerSchema);

export default BorrowComputerModel;
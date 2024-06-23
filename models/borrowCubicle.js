import mongoose from "mongoose";

const BorrowCubicleSchema = new mongoose.Schema({
    correo: {type: String, required: true,},
    nombre: {type: String, required: true,},
    carrera: {type: String},
    numero: {type:Number, required: true},
    hora_entrega: {type: Date, required: true},
    hora_devolucion: {type: Date},
    notas: {type: String},

}, {timestamps: true});

const BorrowCubicleModel = mongoose.model('BorrowCubicle', BorrowCubicleSchema);

export default BorrowCubicleModel;
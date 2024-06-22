import mongoose from "mongoose";

const BorrowBookSchema = new mongoose.Schema({
    matricula: {type: String, required: true,},
    nombre: {type: String, required: true,},
    carrera: {type: String, required: true,},
    isbn: {type:Number, required: true},
    fecha_entrega: {type: Date, required: true},
    estado_entrega: {type: Number, required: true},
    fecha_devolucion: {type: Date, required: true},
    entregado: {type: Boolean, required: true},
    estado_devolucion: {type: Number},

}, {timestamps: true});

const BorrowBookModel = mongoose.model('BorrowBook', BorrowBookSchema);

export default BorrowBookModel;
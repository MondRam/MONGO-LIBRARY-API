import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    titulo: {type: String, required: true,},
    autor: {type: String,},
    genero: {type: String, required: true,},
    isbn: {type:Number, required: true},
    existencias: {type:Number, required: true},

}, {timestamps: true});

const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;
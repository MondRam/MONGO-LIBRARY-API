import mongoose from "mongoose";

const CubicleSchema = new mongoose.Schema({
    numero: {type: Number, required: true,},
    asigando: {type: Boolean, required: true},
    usuario: {type: String,},

}, {timestamps: true});

const CubicleModel = mongoose.model('Cubicle', CubicleSchema);

export default CubicleModel;
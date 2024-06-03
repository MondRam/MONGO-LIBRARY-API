import mongoose from "mongoose";

const ComputerSchema = new mongoose.Schema({
    ip: {type: String, required: true,},

}, {timestamps: true});

const ComputerModel = mongoose.model('Computer', ComputerSchema);

export default ComputerModel;
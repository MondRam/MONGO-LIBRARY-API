import express, { Router } from "express";
import BorrowCubicleModel from "../models/borrowCubicle.js";

const router = express.Router();


const keysFilter = ["correo", "nombre", "numero", "hora_entrega"];

keysFilter.sort();
const defaultKeys = [
    "correo",
    "nombre",
    "numero",
    "hora_entrega"];
defaultKeys.sort();

const matchProperties = (keysReq) => {
    keysReq.sort();
    for (let i = 0; i < keysReq.length; i++) {
        if (defaultKeys[i] !== keysReq[i]) {
            return false;
        }
    }
    return true;
};


router.post("/cubicles-borrow", async (req, res) => {
    const cubicle = new BorrowCubicleModel(req.body);
    try {
        await cubicle.save();
        res.send(cubicle);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/cubicles-borrow/delete/:_id", async (req, res) => {
    try {
        const { _id } = req.params;

        if (_id) {
            console.log(_id);
            const deletedCubicle = await BorrowCubicleModel.findByIdAndDelete({ _id });
            return res.status(200).json({
                code: 200,
                msg: "The Cubicle was deleted",
                body: deletedCubicle,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/cubicles-borrow/view", async (req, res) => {
    try {
        const cubicles = await BorrowCubicleModel.find();
        res.json(cubicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/cubicles-borrow/update/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const keysReq = Object.keys(req.body);
        keysReq.sort();
        const isValid = matchProperties(keysReq);

        if (!isValid) {
            return res.status(400).json({
                code: 400,
                msg: "The keys are not valid",
            });
        }
        if (_id) {
            const newCubicle = await BorrowCubicleModel.findByIdAndUpdate(_id, req.body);
            return res.status(200).json({
                code: 200,
                msg: "The Cubicle was updated",
                body: newCubicle,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch("/cubicles-borrow/partial/update/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        if (_id) {
            const newCubicle = await BorrowCubicleModel.findByIdAndUpdate(_id, req.body);
            return res.status(200).json({
                code: 200,
                msg: "The Cubicle was updated",
                body: newCubicle,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
import express, { Router } from "express";
import CubicleModel from "../models/cubicle.js";

const router = express.Router();

const keysFilter = ["numero", "asignado", "usuario"];
keysFilter.sort();
const defaultKeys = [
    "numero", 
    "asignado", 
    "usuario"];
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

router.post("/cubicles", async (req, res) => {
  const cubicle = new CubicleModel(req.body);
  try {
    await cubicle.save();
    res.send(cubicle);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/cubicles/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    if (_id) {
      console.log(_id);
      const deletedCubicle = await CubicleModel.findByIdAndDelete({ _id });
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

router.get("/cubicles/view", async (req, res) => {
  try {
    const cubicles = await CubicleModel.find();
    res.json(cubicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/cubicles/update/:_id", async (req, res) => {
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
      const newCubicle = await CubicleModel.findByIdAndUpdate(_id, req.body);
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

router.patch("/cubicles/partial/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const newCubicle = await CubicleModel.findByIdAndUpdate(_id, req.body);
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

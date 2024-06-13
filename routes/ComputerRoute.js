import express, { Router } from "express";
import ComputerModel from "../models/computer.js";

const router = express.Router();

const keysFilter = ["ip"];
keysFilter.sort();
const defaultKeys = ["ip"];
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

router.post("/computers", async (req, res) => {
  const computer = new ComputerModel(req.body);
  try {
    await computer.save();
    res.send(computer);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/computers/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    if (_id) {
      console.log(_id);
      const deletedComputer = await ComputerModel.findByIdAndDelete({ _id });
      return res.status(200).json({
        code: 200,
        msg: "The Computer was deleted",
        body: deletedComputer,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/computers/view", async (req, res) => {
  try {
    const computers = await ComputerModel.find();
    res.json(computers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/Computers/update/:_id", async (req, res) => {
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
      const newComputer = await ComputerModel.findByIdAndUpdate(_id, req.body);
      return res.status(200).json({
        code: 200,
        msg: "The Computer was updated",
        body: newComputer,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/Computers/partial/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const newComputer = await ComputerModel.findByIdAndUpdate(_id, req.body);
      return res.status(200).json({
        code: 200,
        msg: "The Computer was updated",
        body: newComputer,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

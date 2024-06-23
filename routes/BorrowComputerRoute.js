import express, { Router } from "express";
import BorrowComputerModel from "../models/borrowComputer.js";

const router = express.Router();


const keysFilter = ["correo", "nombre", "ip", "hora_entrega"];

keysFilter.sort();
const defaultKeys = ["correo", 
    "nombre", 
    "ip", 
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


router.post("/computers-borrow", async (req, res) => {
  const computer = new BorrowComputerModel(req.body);
  try {
    await computer.save();
    res.send(computer);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/computers-borrow/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    if (_id) {
      console.log(_id);
      const deletedComputer = await BorrowComputerModel.findByIdAndDelete({ _id });
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

router.get("/computers-borrow/view", async (req, res) => {
  try {
    const computers = await BorrowComputerModel.find();
    res.json(computers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/computers-borrow/update/:_id", async (req, res) => {
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
      const newComputer = await BorrowComputerModel.findByIdAndUpdate(_id, req.body);
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

router.patch("/computers-borrow/partial/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const newComputer = await BorrowComputerModel.findByIdAndUpdate(_id, req.body);
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
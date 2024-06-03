import express, { Router } from "express";
import ComputerModel from "../models/computer.js";

const router = express.Router();

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


export default router;

import express, { Router } from "express";
import BorrowBookModel from "../models/borrowBook.js";

const router = express.Router();


const keysFilter = ["matricula", "nombre", "carrera", "isbn", "fecha_entrega", "estado_entrega", "fecha_devolucion", "entregado",];

keysFilter.sort();
const defaultKeys = [
  "matricula", 
  "nombre", 
  "carrera", 
  "isbn", 
  "fecha_entrega", 
  "estado_entrega", 
  "fecha_devolucion", 
  "entregado",];
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


router.post("/books-borrow", async (req, res) => {
  const book = new BorrowBookModel(req.body);
  try {
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/books-borrow/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    if (_id) {
      console.log(_id);
      const deletedBook = await BorrowBookModel.findByIdAndDelete({ _id });
      return res.status(200).json({
        code: 200,
        msg: "The Book was deleted",
        body: deletedBook,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/books-borrow/view", async (req, res) => {
  try {
    const books = await BorrowBookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/books-borrow/update/:_id", async (req, res) => {
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
      const newBook = await BorrowBookModel.findByIdAndUpdate(_id, req.body);
      return res.status(200).json({
        code: 200,
        msg: "The Book was updated",
        body: newBook,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/books-borrow/partial/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const newBook = await BorrowBookModel.findByIdAndUpdate(_id, req.body);
      return res.status(200).json({
        code: 200,
        msg: "The Book was updated",
        body: newBook,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
import express, { Router } from "express";
import BookModel from "../models/book.js";

const router = express.Router();


const keysFilter = ["titulo", "autor", "genero"];
keysFilter.sort();
const defaultKeys = [
  "title",
  "autor",
  "genero"
];
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


router.post("/books", async (req, res) => {
  const book = new BookModel(req.body);
  try {
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/books/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    if (_id) {
      console.log(_id);
      const deletedBook = await BookModel.findByIdAndDelete({ _id });
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

router.get("/books/view", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/articles/update/:_id", async (req, res) => {
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
      const newArticle = await ArticleModel.findByIdAndUpdate(_id, req.body);
      return res.status(200).json({
        code: 200,
        msg: "The Article was updated",
        body: newArticle,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/articles/partial/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const newArticle = await ArticleModel.findByIdAndUpdate(_id, req.body);
      return res.status(200).json({
        code: 200,
        msg: "The Article was updated",
        body: newArticle,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

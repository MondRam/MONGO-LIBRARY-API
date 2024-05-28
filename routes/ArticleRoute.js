import express, { Router } from "express";
import ArticleModel from "../models/article.js";

const router = express.Router();


const keysFilter = ["title", "description", "content"];
keysFilter.sort();
const defaultKeys = [
  "title",
  "description",
  "content"
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


router.post("/articles", async (req, res) => {
  const article = new ArticleModel(req.body);
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/articles/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    if (_id) {
      console.log(_id);
      const deletedArticle = await ArticleModel.findByIdAndDelete({ _id });
      return res.status(200).json({
        code: 200,
        msg: "The Article was deleted",
        body: deletedArticle,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/articles/view", async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.json(articles);
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

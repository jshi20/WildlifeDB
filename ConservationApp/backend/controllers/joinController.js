import express from "express";
import { getAnimalWithThisDisease } from "../services/joinService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await getAnimalWithThisDisease(req.body.disease);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

export { router as joinRouter };

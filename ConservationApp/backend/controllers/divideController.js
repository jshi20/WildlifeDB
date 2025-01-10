import express from "express";
import { divideByResearchers } from "../services/divideService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await divideByResearchers();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message.toString() });
  }
});

export { router as divideRouter };

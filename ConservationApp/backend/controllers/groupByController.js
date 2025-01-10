import express from "express";
import { groupByRegion } from "../services/groupByService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await groupByRegion();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message.toString() });
  }
});

export { router as groupByRouter };

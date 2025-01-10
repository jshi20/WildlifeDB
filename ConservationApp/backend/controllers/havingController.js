import express from "express";
import { groupByHaving } from "../services/havingService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await groupByHaving();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message.toString() });
  }
});

export { router as havingRouter };

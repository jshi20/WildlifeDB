import express from "express";
import { nestedGroupByRanger } from "../services/nestedGroupByService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await nestedGroupByRanger();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message.toString() });
  }
});

export { router as nestedGroupByRouter };

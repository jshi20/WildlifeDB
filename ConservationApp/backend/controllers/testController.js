import express from "express";
import testService from "../services/testService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await testService.testConnection();
    res.status(200).json({ message: "Connection successful" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

export { router as testRouter };

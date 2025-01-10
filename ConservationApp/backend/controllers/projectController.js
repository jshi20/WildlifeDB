import express from "express";
import { projectDonors } from "../services/projectService.js";

const router = express.Router();

// selects all when attributes is []
router.post("/", async (req, res) => {
  const attributes = req.body.attributes;
  try {
    const result = await projectDonors(attributes);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message.toString() });
  }
});

export { router as projectRouter };

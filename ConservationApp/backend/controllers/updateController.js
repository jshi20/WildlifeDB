import express from "express";
import { updateRanger, getRangers } from "../services/updateService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await updateRanger(
      req.body.badge_number,
      req.body.new_age,
      req.body.new_exp
    );
    res.status(200).json("Ranger updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await getRangers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

export { router as updateRouter };

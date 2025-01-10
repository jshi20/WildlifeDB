import express from "express";
import { destroyRanger } from "../services/deleteService.js";

const router = express.Router();

router.delete("/", deleteRanger);

async function deleteRanger(req, res) {
  const badge_number = req.body.badge_number;
  try {
    const r = await destroyRanger(badge_number);
    res.status(200).json({ result: r.rowCount });
  } catch (err) {
    const e = err;
    res.status(400).json({ error: e.message });
  }
}

export { router as deleteRouter };

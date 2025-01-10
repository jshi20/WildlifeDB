import express from "express";
import {
  selectOrganismBelongsTo,
  getAllSpecies,
} from "../services/selectionService.js";

const router = express.Router();

router.post("/", select);
router.get("/", species);

async function select(req, res) {
  const whereString = req.body.where;
  try {
    const r = await selectOrganismBelongsTo(whereString);
    res.status(200).json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function species(_req, res) {
  try {
    const r = await getAllSpecies();
    res.status(200).json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export { router as selectionRouter };

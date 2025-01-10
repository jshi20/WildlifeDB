import express from "express";
import { addOrganism, getOrganisms } from "../services/insertService.js";

const router = express.Router();

router.post("/", insertAnimal);
router.get("/", getAllAnimals);

async function insertAnimal(req, res) {
  const sex = req.body.sex;
  const species_name = req.body.species_name;
  const age = req.body.age;

  try {
    const result = await addOrganism(sex, age, species_name);
    if (result === 1)
      res.status(200).json({ message: "Organism added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message.toString() });
  }
}

async function getAllAnimals(req, res) {
  try {
    const ans = await getOrganisms();
    res.status(200).json(ans);
  } catch (error) {
    res.status(500).json({ error: error.message.toString() });
  }
}

export { router as insertRouter };

import pool from "../db/db.js";

export async function addOrganism(sex, age, species_name) {
  try {
    if (sex !== "M" && sex !== "F" && sex !== "N") {
      throw new Error("not supported gender");
    }
    validateInputs(sex, age, species_name);
    return await databaseAdd(sex, age, species_name);
  } catch (error) {
    throw error;
  }
}

function validateInputs(sex, age, species_name) {
  if (typeof age !== "number") throw new Error("Age must be an integer");
  if (typeof sex !== "string" || sex.length !== 1)
    throw new Error("Sex must be a single character");
  if (typeof species_name !== "string")
    throw new Error("Species name must be a string");
}

export async function getAnimals() {
  const animals = await pool.query(`SELECT * FROM animal;`);
  return animals.rows;
}

export async function getOrganisms() {
  const ans = await pool.query(`SELECT * FROM organism_belongs_to;`);
  return ans.rows;
}

async function databaseAdd(sex, age, species_name) {
  try {
    const result = await pool.query(
      `INSERT INTO organism_belongs_to (sex, age, species_name)
       VALUES ($1, $2, $3);`,
      [sex, age, species_name]
    );

    return result.rowCount;
  } catch (error) {
    // throw new Error(
    //   `Error inserting data with values: sex=${sex}, age=${age}, species_name=${species_name}. Database error: ${error.message}`
    // );
    throw new Error(`Species name is not valid`);
  }
}

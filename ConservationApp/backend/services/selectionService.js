import pool from "../db/db.js";

export async function selectOrganismBelongsTo(whereString) {
  const sanetize = validWhereString(whereString);
  const query = sanetize
    ? `SELECT * FROM organism_belongs_to WHERE ${sanetize}`
    : `SELECT * FROM organism_belongs_to`;
  const result = await pool.query(query);
  return result.rows;
}

function validWhereString(whereString) {
  if (typeof whereString !== "string") {
    throw new Error("whereString not string");
  }
  return whereString.replace(/;/g, "");
}

export async function getAllSpecies() {
  const result = await pool.query(`SELECT scientific_name FROM species`);
  return result.rows;
}

import pool from "../db/db.js";

export async function projectDonors(attributes) {
  const attributesString = convertToString(attributes);
  return (
    await pool.query(`SELECT ${attributesString}
                             FROM donor;`)
  ).rows;
}

function convertToString(attributes) {
  const result = JSON.stringify(attributes)
    .replace("[", "")
    .replace("]", "")
    .replace(/"/g, "");
  if (result === "") {
    return "*";
  }
  return result;
}

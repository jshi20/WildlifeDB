import pool from "../db/db.js";

export async function destroyRanger(badge_number) {
  const b = convertToNumber(badge_number);

  const resul = await pool.query(
    `DELETE FROM ranger_number
     WHERE badge_number = ${b}`
  );

  return resul;
}

function convertToNumber(badge) {
  const n = Number(badge);
  if (Number.isNaN(n)) {
    throw new Error("badge_number is not number");
  }
  return Number(badge);
}

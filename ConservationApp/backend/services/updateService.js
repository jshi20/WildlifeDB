import pool from "../db/db.js";

export async function updateRanger(id, newAge, newExp) {
  try {
    verifyData(id, newAge, newExp);
    await queryRanger(id, newAge, newExp);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export async function getRangers() {
  try {
    const result = await pool.query(
      `SELECT *
      FROM ranger_experience 
      JOIN ranger_age 
      ON ranger_experience.badge_number = ranger_age.badge_number
      JOIN ranger_number
      ON ranger_experience.badge_number = ranger_number.badge_number;`
    );
    return result.rows;
  } catch (error) {
    throw new Error("Error retrieving rangers");
  }
}

function verifyData(id, newAge, newExp) {
  if (typeof id !== "number") {
    throw new Error("ID should be a number");
  }
  if (typeof newAge !== "number" && newAge !== null) {
    throw new Error("New age should be a number");
  }
  if (typeof newExp !== "number" && newExp !== null) {
    throw new Error("New experience should be a number");
  }
}

async function queryRanger(id, newAge, newExp) {
  if (newAge === null && newExp === null) {
    throw new Error("No new data provided");
  }
  if (newExp !== null) {
    try {
      await pool.query(
        `UPDATE ranger_experience
                 SET certification_level = ${newExp}
                 WHERE badge_number = ${id};`
      );
    } catch (error) {
      throw new Error("Error updating experience level");
    }
  }
  if (newAge !== null) {
    try {
      await pool.query(
        `UPDATE ranger_age
                 SET age = ${newAge}
                 WHERE badge_number = ${id};`
      );
    } catch (error) {
      throw new Error("Error updating age");
    }
  }
}

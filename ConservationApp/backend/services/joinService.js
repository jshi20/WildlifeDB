import pool from "../db/db.js";

export async function getAnimalWithThisDisease(disease) {
  const sanetize = validateDisease(disease);
  //
  //
  //
  const result = await pool.query(
    `SELECT *
      FROM medical_incident_documents m
      JOIN animal a ON a.organism_tag = m.organism_tag
      WHERE m.disease_name = '${sanetize}';`
  );

  return result.rows;
}

function validateDisease(disease) {
  if (disease === null) {
    throw new Error("Missing parameters");
  }
  return disease.replace(/;/g, ""); //remove semicolons
}

export async function getRangers(name, exp, age) {
  try {
    if (name === null || exp === null || age === null) {
      throw new Error("Missing parameters");
    }

    if (name && exp) {
      const result = await pool.query(
        `SELECT ranger_experience.badge_number, ranger_number.name, ranger_age.age, ranger_experience.certification_level
         FROM ranger_experience
         JOIN ranger_number ON ranger_experience.badge_number = ranger_number.badge_number
         JOIN ranger_age ON ranger_experience.badge_number = ranger_age.badge_number
         WHERE ranger_age.age >= ${age};`
      );

      return result.rows;
    }

    if (name) {
      const result = await pool.query(
        `SELECT ranger_number.badge_number, ranger_number.name, ranger_age.age
         FROM ranger_number
         JOIN ranger_age ON ranger_number.badge_number = ranger_age.badge_number
         WHERE ranger_age.age >= ${age};`
      );

      return result.rows;
    } else if (exp) {
      const result = await pool.query(
        `SELECT ranger_experience.badge_number, ranger_age.age, ranger_experience.certification_level
         FROM ranger_experience
         JOIN ranger_age ON ranger_experience.badge_number = ranger_age.badge_number
         WHERE ranger_age.age >= ${age};`
      );

      return result.rows;
    } else {
      const result = await pool.query(
        `SELECT *
         FROM ranger_age
         WHERE ranger_age.age >= ${age};`
      );

      return result.rows;
    }
  } catch (error) {
    throw error;
  }
}

import pool from "../db/db.js";

export async function divideByResearchers() {
  return (
    await pool.query(`SELECT *
                              FROM organism_belongs_to o
                              WHERE NOT EXISTS ((SELECT r.id
                                                 FROM researcher_name r)
                                                EXCEPT
                                                (SELECT r.researcher_id
                                                 FROM researches r
                                                 WHERE o.tag = r.organism_tag))`)
  ).rows;
}

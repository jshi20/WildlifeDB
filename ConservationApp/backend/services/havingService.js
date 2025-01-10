import pool from "../db/db.js";

export async function groupByHaving() {
  return (
    await pool.query(`SELECT donor.affiliation, SUM(donates.amount)
                              FROM donor,
                                   donates
                              WHERE donor.id = donates.donor_id
                              GROUP BY donor.affiliation
                              HAVING SUM(donates.amount) > 300000
                              ORDER BY SUM(donates.amount);`)
  ).rows;
}

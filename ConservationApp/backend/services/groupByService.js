import pool from "../db/db.js";

export async function groupByRegion() {
  return (
    await pool.query(`SELECT r.continent, SUM(proj.budget)
                              FROM region r,
                                   protects prot,
                                   project_info proj
                              WHERE r.code_name = prot.region_code_name
                                AND proj.operation_name = prot.project_operation_name
                              GROUP BY r.continent
                              ORDER BY r.continent;`)
  ).rows;
}

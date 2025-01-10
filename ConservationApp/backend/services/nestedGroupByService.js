import pool from "../db/db.js";

//finds average age of ranger grouped by ceritifcation level,
//only if their certification level greater than avg certification level
export async function nestedGroupByRanger() {
  return (
    await pool.query(`select re.certification_level, avg(ra.age) as avg_age
                      from ranger_age ra
                      join ranger_experience re
                      on re.badge_number = ra.badge_number
                      where re.certification_level > (
                      select avg(re.certification_level)
                     from ranger_experience re)
                      group by re.certification_level
                      order by re.certification_level;`)
  ).rows;
}

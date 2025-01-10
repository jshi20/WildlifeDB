import pool from "../db/db.js";

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database successfully");
    client.release();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default { testConnection };

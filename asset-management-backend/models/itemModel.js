const db = require("../config/db");

const getItem = async (searchQuery) => {
  try {
    const sqlQuery = `SELECT * FROM itemmaster WHERE ErpCode LIKE ? OR ItemName LIKE ?`;
    const searchPattern = `%${searchQuery}%`;
    const [rows] = await db.execute(sqlQuery, [searchPattern, searchPattern]);
    return rows;
  } catch (error) {
    throw new Error("Error executing search query");
  }
};

module.exports = {
  getItem,
};

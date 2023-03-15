const getDB = require("../getDB");

const createFormQuery = async (full_name, email, mota, mota4, jeep) => {
  let connection;

  try {
    connection = await getDB();

    if (!mota) { mota = 0;}
    if (!mota4) { mota4 = 0;}
    if (!jeep) { jeep = 0;}

    await connection.query(
      `INSERT INTO users (full_name, email, mota, mota4, jeep) VALUES (?, ?, ?, ?, ?)`,
      [full_name, email, mota, mota4, jeep]
    );

  } finally {
    if (connection) connection.release();
  }
};

module.exports = createFormQuery;

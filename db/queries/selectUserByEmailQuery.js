const getDB = require('../getDB');

const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [user] = await connection.query(`SELECT id, mota, mota4, jeep FROM users WHERE email = ? ORDER BY created_at DESC LIMIT 1`, [email]);

    const userId = user[0].id;
    const motaD = user[0].mota;
    const mota4D = user[0].mota4;
    const jeepD = user[0].jeep;
    
    return { userId, motaD, mota4D, jeepD };
    
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;


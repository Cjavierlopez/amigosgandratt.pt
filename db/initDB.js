require ('dotenv').config();

const getDB = require ('./getDB');

const createTables = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log('Creating tables...');

    await connection.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        mota INT DEFAULT 0,
        mota4 INT DEFAULT 0,
        jeep INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
    );
    
    console.log('Tables created!!');
  } catch (err) {
    console.error(err); 
  } finally {
    if (connection) connection.release();

    process.exit();
  }
};

createTables();
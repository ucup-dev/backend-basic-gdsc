const mysql = require('mysql2/promise')

async function setupDB() {
    try {
      const connection = await mysql.createConnection(
        process.env.DATABASE_URI
      );
      console.log("database connected sucessfully.")
      return connection
    } catch (err) {
      console.log(err);
      return null
    }
}

module.exports = {setupDB}
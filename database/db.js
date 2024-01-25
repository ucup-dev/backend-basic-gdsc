const mysql = require('mysql2/promise')

async function setupDB() {
    try {
      const connection = await mysql.createConnection(
        'mysql://root:6FBBgH-4HhgdhHagh3Be6H6d4DCFb3hc@monorail.proxy.rlwy.net:41343/railway'
      );
      console.log("database connected sucessfully.")
      return connection
    } catch (err) {
      console.log(err);
      return null
    }
}

module.exports = {setupDB}
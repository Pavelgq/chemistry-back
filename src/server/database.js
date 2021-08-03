
const sql = require('mssql/msnodesqlv8'); // клиент для MS SQL Server

const sqlConfig = require('../keys/db-config');

async function runQuery(query) {
    const conn  = new sql.ConnectionPool(sqlConfig);
    const pool = await conn.connect();
    let request = new sql.Request(pool);
    
    // console.log(query);
    const result = request.query(query)
    sql.close(); 

    return result;
}
  
module.exports = runQuery;
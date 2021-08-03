const {
  Router
} = require(`express`);
const logger = require(`../logger/logger`);
// const async = require(`../utils/async`);

const sql = require('mssql/msnodesqlv8')
const sqlConfig = require('../keys/db-config');
const runQuery = require('../server/database');

const userRouter = new Router();

userRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  res.header('Access-Control-Allow-Credentials', 'true')

  next();
});

// userRouter.get('/all', (req, res) => {
//   sql.connect(sqlConfig, (err) => {
//     logger.info(err, 'connect')
//     const request = new sql.Request();
//     request.query('select id, firstName, lastName from users', (err, result) => {
//       if (err) return logger.info(err, '/all get');
//       res.json(result);
//       sql.close();
//     });
//   });
// });

/**
 * Show all user (id, firstName, lastName)
 */
userRouter.get('/all', async (req, res) => {
  try {
    const result = await runQuery('select id, firstName, lastName from users')
    res.json(result.recordset);
  }
  catch (error) {
    logger.info('error:', error)
  }
});

/**
 * Sing in
 */
userRouter.post(`/auth`, async (req, res) => {
  try {
    const { login, password } = req.body;
    const result = await runQuery(`select id, firstName, lastName from users where login = '${login}' and password = '${password}' `);
    res.send(result.recordset);
  } catch (error) {
    res.status = 400;
    logger.error(error);
    res.send("Ошибка при авторизации пользователя");
  }
});



module.exports = userRouter;
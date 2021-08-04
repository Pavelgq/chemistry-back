const {
    Router
} = require(`express`);
const logger = require(`../logger/logger`);
// const async = require(`../utils/async`);

const sql = require('mssql/msnodesqlv8')
const sqlConfig = require('../keys/db-config');
const runQuery = require('../server/database');

const chemetryRouter = new Router();

chemetryRouter.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    res.header('Access-Control-Allow-Credentials', 'true')

    next();
});


chemetryRouter.get('/types', async (req, res) => {
    try {
        const result = await runQuery(`select * from typesOfChemetry`);
        res.json(result);
    } catch (error) {
        res.status = 400;
        logger.error(error);
        res.send("Ошибка запроса типов");
    }
})

/**
 * Get all types of chemetry
 */
chemetryRouter.get('/types', async (req, res) => {
    try {
        const result = await runQuery(`select * from typesOfChemetry`);
        res.json(result);
    } catch (error) {
        res.status = 400;
        logger.error(error);
        res.send("Ошибка запроса типов");
    }
})

/**
 * Get all reports about component
 * TODO: add offset, count. Break the responce into parts.
 */
chemetryRouter.get('/store', async (req, res) => {
    try {
        const result = await runQuery(`select * from ChemetryStorage`);
        res.json(result);
    } catch (error) {
        res.status = 400;
        logger.error(error);
        res.send("Ошибка запроса типов");
    }
})

/**
 * Add report about one component
 */
chemetryRouter.post('/store', async (req, res) => {
    try {
        const {
            partNumber,
            typeID,
            manufactureDate,
            unloadingDate,
            userID,
            locationStorage,
            amountIn,
            comment,
            ...params
        } = req.body;
        await runQuery(`insert into ChemetryStorage values (
            '${partNumber}', 
            ${typeID}, 
            '${manufactureDate}', 
            '${unloadingDate}',
            ${userID},
             Getdate(),
            '${locationStorage}',
            ${amountIn},
            ${amountIn},
            ${params.param1 || null},
            ${params.param2 || null},
            ${params.param3 || null},
            ${params.param4 || null},
            '${comment || ''}'
            );`
        )
        // const result = await runQuery(`select * from ChemetryStorage`);
        res.send('Данные в базе');
    } catch (error) {
        res.status = 400;
        logger.error(error);
        res.send("Ошибка сохранения данных");
    }
})

//UPDATE goods SET price = 150 WHERE num = 2

chemetryRouter.get('/types', async (req, res) => {
    try {
        const result = await runQuery(`select * from typesOfChemetry`);
        res.json(result);
    } catch (error) {
        res.status = 400;
        logger.error(error);
        res.send("Ошибка запроса типов");
    }
})

chemetryRouter.get('/recept', async (req, res) => {
    try {
        const result = await runQuery(`select * from ChemetryStorage`);
        logger.info(result.recordset[0])
        const types = await runQuery(`select * from typesOfChemetry where id = '${result.recordset[0].typeID}' `);
        logger.info(types.recordset[0])
        const newResult = result.recordset[0];
        newResult.typeID = types.recordset[0];
        res.json(newResult);
    } catch (error) {
        logger.error(error)
    }
})



module.exports = chemetryRouter;
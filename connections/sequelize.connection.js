const { Sequelize } = require("sequelize");
const dbConfig = require('../configs/db.config');
function createConnection() {

    let sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        define: {
            timestamps: false
        },
        pool: dbConfig.pool
    });

    sequelize.authenticate().then(() => {
        console.log('connected successfully');
    }).catch((error) => {
        console.log("error occurred in connecting db", error);
    });

    return { sequelize }

}

let { sequelize } = createConnection();

function executeWithSync(promiseCallback) {
    sequelize.sync().then(() => promiseCallback);
}

module.exports = { sequelize, executeWithSync };
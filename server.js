/*
    - express is a library that would be used for routing purposes. 
*/
const express = require('express');
const serverConfig = require('./configs/server.config');

const bodyParser = require('body-parser');

const db = require('./models/index');
const app = express();
app.use(bodyParser.json());
require('./routes/product.route')(app);
require('./routes/category.route')(app);

db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Tables dropped and recreated');
    init();
});


function init() {
    let categories = [
        {
            name: 'Electronics',
            description: 'This Category Contains all the electronic items'
        },
        {
            name: 'HomeApplicances',
            description: 'This Category Contains all the Home Appliances'
        }
    ];

    db.category
    .bulkCreate(categories)
    .then(() => {
        console.log("Categories table is initialized");
    }).catch(err => {
        console.log("Error while initializing ategories table");
    })
}

app.listen(serverConfig.PORT, () => {
    console.log(`APP IS RUNNING ON PORT: ${serverConfig.PORT}`);
})

/*

/

*/
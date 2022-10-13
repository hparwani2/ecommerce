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
require('./routes/auth.route')(app);

db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Tables dropped and recreated');
    init();
});


function init() {
    let roles = [
        {
            name: 'admin'
        },
        {
            name: 'user'
        }
    ];

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
    });

    db
    .role
    .bulkCreate(roles)
    .then(() => {
        console.log('Roles created successfully');
    }).catch(err => {
        console.log('error while creating roles');
    })


}

app.listen(serverConfig.PORT, () => {
    console.log(`APP IS RUNNING ON PORT: ${serverConfig.PORT}`);
})

/*

/

*/
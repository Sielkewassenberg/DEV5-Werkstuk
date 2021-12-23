"use strict";

const express = require('express');
const app = express();
const port = 3000;

// twee tables aanmaken in de database 
async function createTables(pg) {
    //table voor producten
    pg.schema.hasTable('producten').then(function (exists) {
        if (!exists) { // als hij nog niet bestaat aanmaken
            return pg.schema.createTable('producten', function (t) {
                // voeg volgende dingen toe 
                t.increments('id').primary(); //afkorting t van table.creer.stijgen primary= id
                t.string('product_name', 100); //karakterwaarde van 100 karakters
                t.integer('product_rating');
                t.text('description'); //zoveel als ik wil schrijven
                t.integer('typesID');
            });
        } else { //kijken of hij is aangemaakt 
            console.log("tabel product gemaakt");
        }
    });
    pg.schema.hasTable('types').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('types', function (t) {
                t.increments('id').primary();
                t.text('type');
            });
        } else {
            console.log("tabel types gemaakt");
        }
    });
}

//connectie met database maken 
const pg = require('knex')({
    client: 'pg',
    connection: {
        //meegegeven in .env file
        host: process.env.POSTGRES_HOST,
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
    }
});

//alle routers
app.get('/', (req, res) => {
    // om al de endpoints krijgen 
    let routes = [];
    app._router.stack.forEach(element => {
        if (element.name === "bound dispatch") {
            routes.push(element.route.path);
        }
    });
    res.send(routes);
});

//read van beide tables 
app.get('/getAll', (req, res) => {
    //beide tabbellen tonen tegelijkertijd
    pg.select("*").table("producten").join('types', 'producten.id', '=', 'types.id').then((data) => {
        //terug sturen om te kunnen weergeven 
        res.send(data);
    });
});

//read van al de producten
app.get('/getAllProducten', (req, res) => {
    pg.select("*").table("producten").then((data) => {
        res.send(data);
    });

});

//read van al de types
app.get('/getAllTypes', (req, res) => {
    pg.select("*").table("types").then((data) => {
        res.send(data);
    });
});

//toevoeging van product
app.get('/insertProduct/:name-:rate-:desc-:typesID', (req, res) => {
    //input omzetten naar variabelen
    //insert vb: /insertProduct/revolve-5-blauw 
    let name = req.params.name;
    let rate = req.params.rate;
    let desc = req.params.desc;
    let typesID = req.params.typesID;
    pg('producten').insert({
            product_name: name,
            product_rating: rate,
            description: desc,
            typesID: typesID
        }) //om te tonen dat het gelukt is
        .then(function (result) {
            res.json({
                success: true,
                message: 'ok'
            });
        });
});

//toevoeging van Type
app.get('/insertType/:type', (req, res) => {
    let type = req.params.type;
    pg('types').insert({
            type: type
        })
        .then(function (result) {
            res.json({
                success: true,
                message: 'ok'
            });
        });
});

// Delete
app.get('/deleteProduct/:productId', (req, res) => {
    let productId = req.params.productId;
    pg('producten').where('id', productId).del().then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});

app.get('/deleteType/:typeId', (req, res) => {
    let typeId = req.params.typeId;
    pg('types').where('id', typeId).del().then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});

//UpdateRating 
app.get('/updateRating/:productId-:newRate', (req, res) => {
    let updateID = req.params.productId;
    let rate = req.params.newRate;
    pg('producten').where({
        id: updateID
    }).update({
        product_rating: rate
    }).then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});

//Update type 
app.get('/updateType/:typeId-:newType', (req, res) => {
    let typeId = req.params.typeId;
    let newType = req.params.newType;
    pg('producten').where({
        typeId: typeId
    }).update({
        newType: newType
    }).then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});

//weergaven in browers 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//aanroepen van begin functie 
createTables(pg);
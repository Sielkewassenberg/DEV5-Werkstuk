"use strict";
const express = require('express');
const app = express();
const port = 3000;

async function createTables(pg) {
    pg.schema.hasTable('producten').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('producten', function (t) {
                t.increments('id').primary();
                t.string('product_name', 100);
                t.int('product_rating');
                t.text('description');
            });
        } else {
            console.log("tabel product gemaakt");
        }
    });
    pg.schema.hasTable('types').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('types', function (t) {
                t.increments('id').primary();
                t.text('type', 100);
            });
        } else {
            console.log("tabel types gemaakt");
        }
    });
}

/*http://makeup-api.herokuapp.com/api/v1/products.json? */

const pg = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
    }
});

app.get('/', (req, res) => {
    let routes = [];
    app._router.stack.forEach(element => {
        if (element.name === "bound dispatch") {
            routes.push(element.route.path);
        }
    });
    res.send(routes);
});

app.get('/getAll', (req, res) => {
    pg.select("*").table("producten").join('types', 'producten.id', '=', 'types.id').then((data) => {
        res.send(data);
    });
});

app.get('/getAllProducten', (req, res) => {
    pg.select("*").table("producten").then((data) => {
        res.send(data);
    });

});

app.get('/getAllTypes', (req, res) => {
    pg.select("*").table("types").then((data) => {
        res.send(data);
    });
});

app.get('/insert/:name-:rate-:desc', (req, res) => {
    let name = req.params.name;
    let rate = req.params.rate;
    let desc = req.params.desc;
    pg('producten').insert({
            product_name: name,
            product_rating: rate,
            description: desc
        })
        .then(function (result) {
            res.json({
                success: true,
                message: 'ok'
            });
        });
});

app.get('/insert2/:type', (req, res) => {

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

createTables(pg);
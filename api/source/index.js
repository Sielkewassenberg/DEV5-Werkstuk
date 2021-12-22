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
                t.string('image_link', 100);
                t.text('lippie pencil');
            });
        } else {
            console.log("tabel product gemaakt");
        }
    });
    pg.schema.hasTable('types').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('types', function (t) {
                t.increments('id').primary();
                t.string('type', 100);
            }).then(function (result) {
                pg('product').join('contacts', 'users.id', '=', 'contacts.id').join('contacts', {
                    'users.id': 'contacts.id'
                });

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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

createTables(pg);
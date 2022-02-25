const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@db:5432/nodeapp'
});

pool.connect().then((client) => {
    client.query(`INSERT INTO public.client(name) VALUES('Ronieri Sales')`)
    .then(() => client.release())
    .catch(error => console.log(error));
})

const port = 3000;

const app = express();

app.get('/', async (req, res) => {
    const client = await pool.connect();
    const {rows: [response]} = await client.query(`SELECT name FROM public.client LIMIT 1;`);
    client.release();
    res.send(`<h1>Full Cycle Rocks!</h1><ul><li>${response.name}</li></ul>`);
})

app.listen(port, ()=> {console.log(`NodeApp is listening on port ${port}`)});
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Conectado a PostgreSQL 🗄️');
});

pool.on('error', (err) => {
    console.error('Error al conectarse a la base de datos:', err);
    //Paramos el proceso si hay un error de conexión
    process.exit(1);
})


module.exports = pool;


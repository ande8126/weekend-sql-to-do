//import pg library
const pg = require( 'pg' );

//setup pg connection to db with pool
const pool = new pg.Pool({
    database: 'tasklog',
    host: 'localhost',
    port: 5432, //postgres default
    max: 10,
    idleTimeoutMillis: 20000 //20 seconds to try connection
})

//exports
module.exports = pool;

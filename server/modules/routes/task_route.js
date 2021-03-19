//CRUD HAPPENS HERE (ROUTES FOR GET/POST/PUT/DELETE)

//bring in express
const express = require( 'express' );
const router = express.Router();
const pool = require( '../pool' );


//routes
router.get( '/', ( req, res )=>{
    console.log( 'in task_route GET' );
    let queryText = `SELECT * FROM tasks ORDER BY id;`;
    pool.query( queryText )
    .then( results =>{
        //send back results from task list
        res.send( results.rows );
    })
    .catch(error=>{
        console.log( 'error getting back from tasks', error );
        res.sendStatus( 500 );
    })
}) 


//exports
module.exports = router;
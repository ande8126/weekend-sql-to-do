//CRUD HAPPENS HERE (ROUTES FOR GET/POST/PUT/DELETE)

//bring in express
const express = require( 'express' );
const router = express.Router();
const pool = require( '../pool' );


//routes

//GET route to get all table data for DOM upon load
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

//POST route to allow users to send new tasks to db
router.post( '/', ( req, res )=>{
    //bring in post from client with req.body
    let newTask = req.body;
    console.log( 'in task_route POST', req.body );
    //send query over to db
    let queryText = `INSERT INTO tasks (doer, task, status) VALUES ($1, $2, FALSE);`;
    pool.query( queryText, [newTask.doer, newTask.task])
    .then( (results) =>{
        //send status-created
        res.sendStatus( 201 );
    })
    .catch( (error)=>{
        console.log( 'error getting back from tasks', error );
        res.sendStatus( 500 );
    })
})


//exports
module.exports = router;
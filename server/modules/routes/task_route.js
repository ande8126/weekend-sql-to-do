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
    .then( (results)=>{
        //send status-created
        res.sendStatus( 201 );
    })
    .catch( (error)=>{
        console.log( 'error getting back from tasks', error );
        res.sendStatus( 500 );
    })
})

//PUT route to check off tasks as their done
router.put( '/:taskId', ( req, res )=>{
    //set id to variable
    let id = req.params.taskId
    //double check with console log
    console.log( 'updating task with id:', id);
    //mark status as true in db
    //send query over
    let queryString = `UPDATE tasks SET status=true WHERE id=$1;`;
    //ask pool to run query
    pool.query( queryString, [ id ])
    .then( (results)=>{
        //send back OK status if successful
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        //send error if not
        console.log( err );
        res.sendStatus( 500 );
    })
})//end PUT

//DELETE route to remove an task if needed
router.delete('/:taskId', ( req, res )=>{
    console.log( 'in task_route DELETE' );
    let id = req.params.taskId;
    let queryText = `DELETE FROM tasks WHERE id=$1;`;
    pool.query( queryText, [ id ] )
    .then( (results)=>{
        //delete sends back OK
        res.sendStatus( 200 );
    }).catch ( (error)=>{
        console.log('There was an error', error );
        res.sendStatus( 500 );
    })
})

//exports
module.exports = router;
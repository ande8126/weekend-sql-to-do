//bring in express and body parser
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
//set global variable for port
const port = 5000;

//setup body parser to translate POST
app.use( bodyParser.urlencoded({ extended: true }));

//let server know where to find static files for DOM
app.use( express.static( 'server/public' ) );

//router
let taskRouter = require( './modules/routes/task_route' );
app.use( '/tasks', taskRouter );

//spin up server
app.listen( port, ()=>{
    console.log( 'server is a go on:', port );
})

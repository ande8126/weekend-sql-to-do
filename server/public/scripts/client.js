$( document ).ready( onReady );
let completedTasks = [];


function onReady(){
    console.log( 'JQ' );
    getTasks();
    $( '#addTaskButton' ).on( 'click', addTask )
    $( '#showCompletedTasksButton' ).on( 'click', function( event ){
        showCompletedTasks( completedTasks );
    })
    $( '#toDosOut' ).on( 'click', '.checkOffTaskButton', checkOffTask )
    $( '#tables' ).on( 'click', '.deleteTaskButton', deleteTask )
}//end onReady

//POST route for sending new tasks to db
function addTask(){
    let taskToSend = {
        doer: $( '#taskOwner' ).val(),
        task: $( '#taskIn' ).val()
    }//end taskToSend
    //call ajax
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then( function( response ){
        console.log( 'back from server with POST response:', response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error in addTask' );
    })//end ajax
    //empty task input
    $( '#taskIn' ).val( '' );
}//end addTask

//PUT route for checking off tasks
//move them to separate table
function checkOffTask(){
    console.log( 'in checkOffTask for PUT' );
    //set unique click to variable
    const myId = $( this ).data( 'id' );
    //send variable to server/db w/ajax PUT
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + myId
    }).then( function( response ){
        console.log( 'back from server with PUT', response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'Error in checkOffTask', err );
    })//end ajax
}//end checkOffTask

function deleteTask(){
    console.log( 'in deleteTask for DELETE' );
    //set variable for unique click
    const myId = $( this ).closest( 'tr' ).data( 'id' )
    //set up ajax for DELETE handshake
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + myId
    }).then( function( response ){
        console.log( 'back from server with DELETE', response);
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'Error in deleteTask', err );
    })//end ajax
}//end deleteTask

function getTasks(){
    //call ajax w/GET route
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        console.log( 'back from GET with response', response );
        //assign the two table DOM elements to new variables for output
        let el = $( '#toDosOut' );
        let elTwo = $( '#donesOut' );
        //empty
        el.empty();
        elTwo.empty();
        //loop thru all of the database
        //append the tasks to two tables, depending on if completed
        for ( let i=0; i<response.length; i++ ){
            let task = response[i];
            let checkMark = `<button data-id="${task.id}" class="checkOffTaskButton">&#10004</button>`;
            if ( task.status === true ){
                checkMark = `-`
                elTwo.append(`
                <tr data-id=${task.id}>
                    <td>${task.doer}</td>
                    <td>${task.task}</td>
                    <td>${checkMark}</td>
                    <td><button class="deleteTaskButton">Delete</button>
                </tr>
                `)
            }//end status marked true (task complete)
            else if ( task.status === false ){
            //append
            el.append(`
            <tr data-id=${task.id}>
                <td>${task.doer}</td>
                <td>${task.task}</td>
                <td>${checkMark}</td>
                <td><button class="deleteTaskButton">Delete</button>
            </tr>
            `)
            }//end status marked false (task not done)
        }//end for
    }).catch( function( err ){
        console.log( err );
        alert( 'error in getTasks', err );
    })//end ajax
}//end getTasks

function showCompletedTasks( array ){
    console.log( 'in showCompletedTasks', array );
    ///NEED A WAY TO TOGGLE THIS SO IT DOESNT JUST REPEAT
    let bottom = $( '.bottomSection' )
    bottom.append( `
        <table id="closedTasks">
            <thead>
                <th>Owner</th>
                <th>Task<th>
                <th>Status</th>
                <th>Remove</th>
            </thead>
            <tbody id="donesOut">
            </tbody>
        </table>
        ` )
    //target new output with variable
    let el = $( '#donesOut' );
    //empty
    el.empty();
    //loop thru array of done tasks
    for ( let i=0; i<array.length; i++ ){
        //set new variable for index
        let task = array[i];
        //append
        el.append(`
        <tr data-id=${task.id}>
            <td>${task.doer}</td>
            <td>${task.task}</td>
            <td>${task.status}</td>
            <td><button class="deleteTaskButton">Delete</button>
        </tr>
        `)
    }//end for
}//end showCompletedTasks
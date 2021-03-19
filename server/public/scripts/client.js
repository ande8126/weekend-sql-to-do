$( document ).ready( onReady );

function onReady(){
    console.log( 'JQ' );
    getTasks();
    $( '#addTaskButton' ).on( 'click', addTask )
    $( '#showCompletedTasksButton' ).on( 'click', showCompletedTasks )
    $( '#toDosOut' ).on( 'click', '.checkOffTaskButton', checkOffTask )
}//end onReady

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

function getTasks(){
    //call ajax w/GET route
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        console.log( 'back from GET with response', response );
        //target top table with variable
        let el = $( '#toDosOut' );
        //empty
        el.empty()
        for ( let i=0; i<response.length; i++ ){
            let task = response[i];
            let checkMark = `<button data-id="${task.id}" class="checkOffTaskButton">&#10004</button>`;
            if ( task.status ){
                checkMark = `-`
                showCompletedTasks();   
                $( '#donesOut' ).append(`
                <tr data-id=${task.id}>
                    <td>${task.doer}</td>
                    <td>${task.task}</td>
                    <td>${checkMark}</td>
                    <td><button class="deleteTaskButton">Delete</button>
                </tr>
                `)
            }//end append to completed tasks table
            else{
                el.append(`
                <tr data-id=${task.id}>
                    <td>${task.doer}</td>
                    <td>${task.task}</td>
                    <td>${checkMark}</td>
                    <td><button class="deleteTaskButton">Delete</button>
                </tr>
                `)
            }//end append to new tasks table
        }//end for
    }).catch( function( err ){
        console.log( err );
        alert( 'error in getTasks', err );
    })//end ajax
}//end getTasks

function showCompletedTasks(){
    ///NEED A WAY TO TOGGLE THIS SO IT DOESNT JUST REPEAT
    let el = $( '.bottomSection' )
    el.append( `
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
}//end showCompletedTasks
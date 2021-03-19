$( document ).ready( onReady );

function onReady(){
    console.log( 'JQ' );
    getTasks();
    addTaskButton
    $( '#addTaskButton' ).on( 'click', addTask )
    $( '#showCompletedTasksButton' ).on( 'click', showCompletedTasks );
}

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
            let checkMark = `<button class="checkTaskButton"> &#10004 </button>`;
            if ( task.status ){
                checkMark = `-`   
                $( '#closedTasks' ).append(`
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
    let el = $( 'main' )
    el.append( `
    <table id="closedTasks">
     <thead>
        <th>Owner</th>
        <th>Task<th>
        <th>Status</th>
        <th>Remove</th>
     </thead>
    <tbody id="toDosOut"></tbody>
    </table>
    ` )
}//end showCompletedTasks
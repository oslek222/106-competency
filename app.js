important = true;
formVisible= true;

allMyTasks
function toggleImportant() {
  console.log("clicked");

  if(important){
    $("#iImportant").removeClass("fas").addClass("far");
    important = false;
  }else{
    $("#iImportant").removeClass("fas").addClass("far");
    important = true;
  }
  
}

function save(){
    console.log("saving task");
    let title = $("#txtTitle").val();
    let date = $("#selDate").val();
    let location = $("#txtLocation").val();
    let priority = $("#selPriority").val();
    let color = $("#selColor").val();
    let contact = $("#txtContact").val();
    let desc = $("#txtDescrition").val();


let task = new Task(title, important, date, location, prioirity, color, contact, desc);
$.ajax({
type:"POST",
url:serverUrl + "api/tasks/",
data: JSON.stringify(task),
contentType: "application/json",
success: function (res) {
    console.log("Server says", res);

    let t = JSON.parse(res);
    displayTask(t);
},
error: function (error){
    console.error("Error saving task", error);
},
});
}
function displayTask(task){
let iClass = "";
if(task.important){
    iClass = "fas fa-star";

}else{
    iClass = "far fa-star";
}
let btn = "";
if(!task.done){
    btn= ` <button onClick="doneTask('${task._id}')" class="btn btn-sm btn-dark">done</button>`;
    
}

    let syntax = `<div id="${task._id}class="task" style="border: 2px solid ${task.color}">
    <div class="task">
    <i class="fas fa-star"></i>
    <div class="info">
    <h6>${task.title}</h6>
    <p>${task.desrciption}</p>
    </div>
    <label>${task.location}</label>
    <label>${task.contact}</label>
    <label>${task.dueDate}</label>
  ${btn}
   </div> `;

   if(task.done){
       $(".done-tasks").append(syntax);
   }
   $(".pending-tasks").append(syntax);
}
function doneTask(id){
    console.log("mark as done:", id);
    $("#"+ id).remove();
    for(let i=0; i<allMyTasks.lenght; i++){
        let task = allMyTasks[i];
        if(task._id === id){
            console.log("found it", task);

            task.done = true;

            $.ajax({
                type:"PUT",
                url:serverUrl + "api/tasks",
                data: JSON.stringify(task),
                contentType:"application/json",
                succsess: function(res){
                    displayTask(task);
                    console.log(res);
                    },
                    error: function(err){
                        console.error("error updating task", err);
                    }
                }
            })
        }
    }
}

function fetchTasks(){
    $.ajax({
        type:"GET",
        url: serverUrl +"api/tasks",
        succsess: function(res){
            console.log(res);
            alert("tasks cleared")
            let tasks = JSON.parse(res);
            for(let i=0; i < tasks.length; i++){
                let task = tasks[i];
                if(tasks.name === "matt"){
                    allMyTasks.push(task);
                displayTask(task);
            }
            }
        },
        error: function(err){
            console.error("error getting data", error);
        },
    });
}
function toggleForm(){
    if(formVisible){
        formVisible = false;
        $("btnToggle").text("show deets");
}else{
    $("btnToggle").text("hide deets");
    
    $(".section-form").toggle(300);
}
function init() {
  console.log("calender system");

fetchTasks();

  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(save);
  $("#btnToggle").click(toggleForm);
  $("#btnClear").click(clearAll);
}

window.onload = init;

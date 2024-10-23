const countdownContainer = document.getElementById("countdown");
const dob = new Date();
let remainingTime = (new Date("July 7, 2064").getTime() - dob.getTime());
setInterval(() => {
    remainingTime -= 1;
    const time=convertMilliseconds(remainingTime);
    countdownContainer.innerText =`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`;
}, 1);

function convertMilliseconds(ms) {
    // 1 second = 1000 milliseconds
    const seconds = Math.floor(ms / 1000);
    
    // 1 minute = 60 seconds
    const minutes = Math.floor(seconds / 60);
    
    // 1 hour = 60 minutes
    const hours = Math.floor(minutes / 60);
    
    // 1 day = 24 hours
    const days = Math.floor(hours / 24);

    // Remaining hours, minutes, and seconds
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return {
        days: days,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds
    };
}

const searchForm = document.getElementById("searchform");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = document.getElementById("search").value;
    console.log(searchText);
    console.log(searchText.trim().length == 0);
    if (searchText.trim().length == 0) {
        document.getElementById("search").classList.add("border-orange");
        document.getElementById("search").classList.add("border-2");
        setTimeout(() => {
            document.getElementById("search").classList.remove(["border-red-900", "border-2"]);
        }, 2000);
    }
    else {
        document.getElementById("search").value = "";
        location.href = "https://google.com/search?q=" + searchText;
    }
    return false;
});


function toggleOffCanvas(toBeOpened = false) {
    const offCanvas = document.getElementById("offcanvas");
    if (toBeOpened) {
        // offCanvas.classList.add("translate-y-full");
        offCanvas.classList.remove("-translate-y-full");
    }
    else {
        offCanvas.classList.add("-translate-y-full");
        // offCanvas.classList.remove("translate-y-full");
    }
}

const offCanvas = document.getElementById("offcanvas");
offCanvas.addEventListener("click",(e)=>{
    console.log(e.target.getAttribute("id"));
    
    if(e.target.getAttribute("id")==="offcanvas"){
        toggleOffCanvas(false);
    }
})




function renderFeedBack(feedBacktype,message){
    const availbleClasses=
    {
        "error":"text-red-500",
        "success":"text-green-500"
    };
    const feedbackMesssageContiner=document.getElementById("feedback-messsage");
    feedbackMesssageContiner.innerText=message;
        feedbackMesssageContiner.classList.add(availbleClasses[feedBacktype]);
        setTimeout(()=>{
            feedbackMesssageContiner.innerText="";
            feedbackMesssageContiner.classList.remove(availbleClasses[feedBacktype]);
        },1000);
}
function addTasks(){
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    const newTaskContainer=document.getElementById("newtaskinput");
   
    const newTask=newTaskContainer.value;
    if(newTask.trim().length===0){
        if(!newTaskContainer.classList.contains("border-red-900"))
        {
            newTaskContainer.classList.add("border border-red-900");
        }
        renderFeedBack("error","Empty task discarded.")
        return ;
    }
    const isTaskExist=tasks.filter(task=>task==newTask).length==1;
    if(isTaskExist){
        renderFeedBack("error","Duplicate task found.");
        return ;
    }
    tasks.push(newTask);
    if(newTaskContainer.classList.contains("border-red-900")){
        newTaskContainer.classList.remove("border border-red-900");
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderFeedBack("success","Task added successfully.")
    renderTasks();
}

function renderTasks(){
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    const taskContainer=document.getElementById("tasks");
    taskContainer.innerHTML="";
    for (let i = 0; i < tasks.length; i++) {
        const task=createTask(tasks[i],i+1);
        taskContainer.append(task);
    }
}

function createTask(taskMessage,taskNumber){
    const taskContainer=document.createElement("div");
    taskContainer.setAttribute("data-task-number",taskNumber);
    taskContainer.classList.add("flex");
    taskContainer.classList.add("gap-2");


    const task=document.createElement("p");
    task.innerText=taskNumber+") "+taskMessage;
    task.classList.add("flex-grow");
    task.setAttribute("contenteditable",true);


    const taskDeleteAction=document.createElement("button");
    taskDeleteAction.classList.add("p-2");
    taskDeleteAction.classList.add("rounded");
    taskDeleteAction.classList.add("inline-block");
    taskDeleteAction.classList.add("outline-none");
    taskDeleteAction.classList.add("bg-red-500");
    taskDeleteAction.classList.add("w-fit");
    taskDeleteAction.innerText="Del";
    taskDeleteAction.addEventListener("click",(e)=>{
        let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
        let remainingTasks=[];
        console.log(taskDeleteAction.parentElement);
        console.log(taskDeleteAction.parentElement.dataset);
        
        for (let i = 0; i < tasks.length; i++) {
            if(taskDeleteAction.parentElement.dataset.taskNumber==i+1){
                continue;
            }
            remainingTasks.push(tasks[i]);
        }
        console.log(remainingTasks);
        
        localStorage.setItem("tasks",JSON.stringify(remainingTasks));
        renderTasks();
    })
    
    taskContainer.append(task);
    taskContainer.append(taskDeleteAction);

    return taskContainer;
}

renderTasks();
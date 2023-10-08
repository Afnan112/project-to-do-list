//This Is Code "Read" => Display Tasks In The Tables 
let tasks = [
    //json obj انا هنا راح اعرف مهمه جديده راح تكون عباره عن 
    {
        "title": "Studying",
        "date": "7/1/2023",
        "isDone": true
    },
    {
        "title": "Reading",
        "date": "8/1/2023",
        "isDone": false
    },
    {
        "title": "Running",
        "date": "9/1/2023",
        "isDone": false
    },
]

function getTasksFromStorage(){
    // parse => Jsonالى string داله تحول
    //retrievedTasks => storage المهام اللي جتني من 
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    //   فروح للقيمه الافتراضيه اللي بعد علامتين الاستفهام وهي عباره عن مصفوفه فاضيهnull ولكن اذا كانت tasks = retrievedTasksمعناه خل 
        tasks = retrievedTasks ?? []   
}

getTasksFromStorage()

function fillTasksOnPage(){
    // for  فقلت له فرغ لي المحتوى قبل تعبيهم بhtml سويت كذا على شين مايطبع لي المحتوى اللي كتبته في 
    document.getElementById("tasks-content").innerHTML = ""
    
    let index = 0
    for(let task of tasks) {

        let content = 
        `
        <div class="task ${task.isDone ? 'done' : ''} ">

            <!-- Task Info -->
            <div style="width: 70%;">
                <h2>${task.title}</h2>
                <div class="calender">
                    <span class="material-symbols-outlined">
                        calendar_month
                    </span>
                    <span>
                        ${task.date}
                    </span>
                </div>
            </div>
            <!-- //Task Info// -->

            <!-- Task Actions -->
            <div class="bun-actions">
                <button onclick="deletTask(${index})" class="circular" style="background-color:#F7A4A4;">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>

                ${task.isDone ? `
                    <button  onclick="toggleTaskCompletion(${index})" class="circular" style="background-color:#FEBE8C;">
                    <span class="material-symbols-outlined">
                        cancel
                    </span>
                </button>
                
                ` : `
                    <button  onclick="toggleTaskCompletion(${index})" class="circular" style="background-color:#FEBE8C;">
                        <span class="material-symbols-outlined">
                            done
                        </span>
                    </button>
                    
                `}

                <button onclick="updateTask(${index})" class="circular" style="background-color:#B6E2A1;">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </div>
            <!-- //Task Actions// -->
        </div>
        `
        // بدل مااخليه يطبع لي جمله انا ابغى يعبيه بكل المهام 
        document.getElementById("tasks-content").innerHTML += content  
        index++
    }
}
fillTasksOnPage()
// //This Is Code "Read" => Display Tasks In The Tables //

//This Is Code "Create" => Insert New Task
document.getElementById("but-add").addEventListener("click", function(){
    // داله واعرف كبراميتر الرسالة االي تطلع للمستخدم وذي الدله لها ارجاع يعني ترجع قيمه وهي القيمه اللي ادخالها المستخدم
    let taskName = prompt("Wrire Your Tasks For The Day!")
    /*
        اضيف المهمه اللي ادخلها المستخدم  على المصفوفه
        وهي اني احول العنوان اللي ادخله المستخدم الى كائن 
        كيف ؟
        راح اسوي الكائن من نفسي واعتمد على العنوان اللي ادخل المستخدم
        فراح اعرف متغير وهو عباره عن جاسون و القيمه والمفتاح لازم يكونوا نفس المفتاح والقيمه اللي
        في المصفوفه الاساسيه 

    */
    let nowDate = new Date()
    let date = nowDate.getDate() + "/" + (nowDate.getMonth()+1) + "/" + nowDate.getFullYear() + " | " + nowDate.getHours() + ":" + nowDate.getMinutes()
    let taskObject = {
        "title": taskName, //اللي قرأتها من المستخدمtaskName فيمته 
        "date":  date,
        "isDone": false
    }
    tasks.push(taskObject)

    storedTasks()

    fillTasksOnPage()
})
// //This Is Code "Create" => Insert New Task//


// This Is Code "Delete" => Delete Task From ToDo List

function deletTask(index) {
    let task = tasks[index]
    let isConfirmed = confirm("Do You Sure Delete This Task : " + task.title) 
    if(isConfirmed){
        // داله تحذف عند فهرس معين 
        // لها 2 براميتر  الاول هو الفهرس اللي ابغى احذف منه العصر
        // index الثاني كم عدد العناصر اللي ابغى اشيلها من المصفوفه ابتداء من 
        tasks.splice(index, 1)
        storedTasks()
        fillTasksOnPage() // استدعيتها على شين يظهر عمليه الحف في الجدول وليس فقط في التمثيل البرمجي في الجدول
    }
}
// //This Is Code "Delete" => Delete Task From ToDo List//
//This Is Code "Update" => Change Name Task
function updateTask(index) {
    let task = tasks[index] // هنا على شين اعرف اي مهمه راح يتم تعديلها اعدلها
    let editTask = prompt("Wrire New Name Task", task.title) 
    if(editTask == null){
        return
    }
    task.title = editTask
    storedTasks()
    fillTasksOnPage()
}
////This Is Code "Update" => Change Name Task//
// This Is Code "Done"
function toggleTaskCompletion(index) {
    let task = tasks[index]
    task.isDone = !task.isDone  // ! => تستخدم لعكس الصح الى خطا والغكس 
    storedTasks()
    fillTasksOnPage()
}
// // This Is Code "Done"//

// ========Storage Function========

function storedTasks(){

    // string احول المصفوفة الى 
    // stringify => string داله تتلقى كبراميتر الشي اللي ابغى احوله الى 
    let tasksString = JSON.stringify(tasks)
    //setItem => write
    localStorage.setItem("tasks", tasksString)
}

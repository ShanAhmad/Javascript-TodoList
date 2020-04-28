//Defining UI Variables
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const input = document.querySelector('#task');

//Function for Loading All the Event Listners
loadEventListeners();

//LoadEventListeners
function loadEventListeners() {
    //DOM Load event(shows value from local storage)
    document.addEventListener('DOMContentLoaded', getTasks);
    //Used To Add Tasks
    form.addEventListener('submit', addTask);
    //Used To Remove Task
    tasklist.addEventListener('click', removeTask);
    //Clearing all tasks using button
    clearbtn.addEventListener('click', clearTasks);
    //Filtering Search Results
    filter.addEventListener('keyup', filterTasks);

}

//Getting data from Local Storage
//These values will remain if page is reloaded! 
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        //Create a List Item
        const li = document.createElement('li');
        //Adding a class to list item
        li.className = 'collection-item';
        //Adding Text inside the li
        li.appendChild(document.createTextNode(task));
        //Creating a new link for deleting list item
        const link = document.createElement('a');
        //Add Class to the link
        link.className = 'delete-item secondary-content';
        //Adding delete Icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Adding link to the li
        li.appendChild(link);
        //Adding li to the main ul
        tasklist.appendChild(li);
    });
}

//Add Task
function addTask(e) {
    if (input.value === '') {
        alert('Add a task');
    } else {
        //Create a List Item
        const li = document.createElement('li');
        //Adding a class to list item
        li.className = 'collection-item';
        //Adding Text inside the li
        li.appendChild(document.createTextNode(input.value));
        //Creating a new link for deleting list item
        const link = document.createElement('a');
        //Add Class to the link
        link.className = 'delete-item secondary-content';
        //Adding delete Icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Adding link to the li
        li.appendChild(link);
        //Adding li to the main ul
        tasklist.appendChild(li);

        storeTaskInLocalStorage(input.value);
        //Clearing input Field
        input.value = '';
    }

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            //Actual Element is Passed
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clearing All Tasks
function clearTasks() {
    //First Method
    //tasklist.innerHTML = '';
    //Second Method (Faster)
    if (confirm('Are you sure?')) {
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild);
        }
        clearingAllTasksFromLocalStorage();
    }
}

//Clearing All Tasks From Local Storage
function clearingAllTasksFromLocalStorage() {
    localStorage.clear();
}

//Filtering Search
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
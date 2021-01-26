// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const clearButton = document.querySelector(".clear-btn");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
clearButton.addEventListener('click', clearTodo);

// Functions
function addTodo(e) {
    //Prevent form from submitting
    e.preventDefault();
    // Check for empty input field
    if (todoInput.value === '') {
        alert('Enter a todo');
    } else {
        //Create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        //Add todo to local storage
        saveLocalTodos(todoInput.value);
        // Create link
        const link = document.createElement("a");
        //Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        completedButton.classList.add("complete-btn");
        link.appendChild(completedButton);
        //Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = "<i class='far fa-edit'></i>";
        editButton.classList.add("edit-btn");
        link.appendChild(editButton);
        //Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-times-circle'></i>";
        trashButton.classList.add("trash-btn");
        link.appendChild(trashButton);
        // Append link to li
        newTodo.appendChild(link);
        //Append to list
        todoList.appendChild(newTodo);
        //Clear todo input value
        todoInput.value = "";
    }
};

function deleteTodo(e) {
    const item = e.target;
    //Delete todo
    if (item.classList[0] === "trash-btn") {
        if (confirm('Are you sure?')) {
            const todo = item.parentElement.parentElement;
            //Animation
            todo.classList.add("fall");
            removeLocalTodos(todo)
            todo.addEventListener('transitionend', function() {
                todo.remove();
            });
        }
    }

    //Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    }
};

function clearTodo() {
    // todoList.innerHTML = "";

    // this is a faster way of clearing
    while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
};

function saveLocalTodos(todo) {
    //Check---hey: Do I already have things  in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

function getTodos() {
    //Check---hey: Do I already have things  in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(todo => {
        //Create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        // Create link
        const link = document.createElement("a");
        //Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        completedButton.classList.add("complete-btn");
        link.appendChild(completedButton);
        //Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = "<i class='far fa-edit'></i>";
        editButton.classList.add("edit-btn");
        link.appendChild(editButton);
        //Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-times-circle'></i>";
        trashButton.classList.add("trash-btn");
        link.appendChild(trashButton);
        // Append link to li
        newTodo.appendChild(link);
        //Append to list
        todoList.appendChild(newTodo);
    })
};

function removeLocalTodos(todo) {
    //Check---hey: Do I already have things  in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};
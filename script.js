// script.js

// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${task}</span>
        <div class="task-buttons">
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>
    `;
        taskList.appendChild(taskItem);
});
}

// Add Task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
});

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Edit Task
function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index]);
    if (newTask !== null) {
        tasks[index] = newTask.trim();
        saveTasks();
        renderTasks();
    }
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Initial rendering
renderTasks();

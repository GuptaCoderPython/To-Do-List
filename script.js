let userName = "";

// Task Management
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>TaskID:</strong> ${task.title}<br>
      <strong>Task:</strong> ${task.description}<br>
      <strong>Date:</strong> ${task.date}
<br>
      <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskTitle = taskTitleInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  if (!taskTitle || !taskDescription) {
    alert("Please fill out both");
    return;
  }

  const date = new Date().toLocaleString();
  tasks.push({ title: taskTitle, description: taskDescription, date });
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  saveTasks();
  renderTasks();

  alert("Task added successfully!");
}

function deleteTask(index) {
  const deletedTask = tasks.splice(index, 1)[0];
  deletedTasks.push(deletedTask);
  saveTasks();
  renderTasks();

  alert("Task deleted successfully!");
}

function recoverTask() {
  const taskTitle = prompt("Enter the Task ID of the task to recover:");

  if (!taskTitle) {
    alert("You must enter a task Task ID to recover!");
    return;
  }

  const taskIndex = deletedTasks.findIndex(task => task.title === taskTitle);

  if (taskIndex === -1) {
    alert("No task found with the given Task ID in deleted tasks!");
    return;
  }

  const recoveredTask = deletedTasks.splice(taskIndex, 1)[0];
  tasks.push(recoveredTask);
  saveTasks();
  renderTasks();

  alert(`Task "${taskTitle}" recovered successfully!`);
}

document.getElementById("add-task-btn").addEventListener("click", addTask);
document.getElementById("recover-task-btn").addEventListener("click", recoverTask);

// Initial rendering of tasks
renderTasks();

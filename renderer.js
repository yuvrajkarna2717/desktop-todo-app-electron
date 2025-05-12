const taskNameInput = document.getElementById("task-name");
const taskDescInput = document.getElementById("task-desc");
const taskTagsInput = document.getElementById("task-tags");
const addTaskButton = document.getElementById("add-task-btn");
const showTaskFormButton = document.getElementById("show-task-form-btn");
const cancelTaskButton = document.getElementById("cancel-task-btn");
const taskForm = document.getElementById("task-form");
const tasksList = document.getElementById("tasks-list");

let tasks = [];

// Function to render tasks and subtasks
function renderTasks() {
  tasksList.innerHTML = ""; // Clear the task list

  tasks.forEach((task, taskIndex) => {
    const taskElement = createTaskElement(task, taskIndex);
    tasksList.appendChild(taskElement);
  });
}

// Function to create a task element
function createTaskElement(task, taskIndex) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task-header");

  const taskTitle = document.createElement("div");
  taskTitle.textContent = `${task.name}`;

  const addSubtaskButton = document.createElement("button");
  addSubtaskButton.textContent = "Add Subtask";
  addSubtaskButton.onclick = () => toggleSubtaskForm(taskIndex);

  taskHeader.appendChild(taskTitle);
  taskHeader.appendChild(addSubtaskButton);

  taskElement.appendChild(taskHeader);
  taskElement.appendChild(createDescriptionElement(task.description));

  // Render tags
  if (task.tags && task.tags.length > 0) {
    task.tags.forEach(tag => {
      const tagElement = createTagElement(tag);
      taskElement.appendChild(tagElement);
    });
  }

  if (task.subtasks.length > 0) {
    const subtasksList = document.createElement("div");
    task.subtasks.forEach((subtask, subtaskIndex) => {
      const subtaskElement = createSubtaskElement(subtask, taskIndex, subtaskIndex);
      subtasksList.appendChild(subtaskElement);
    });
    taskElement.appendChild(subtasksList);
  }

  return taskElement;
}

// Function to create subtask element (indented slightly)
function createSubtaskElement(subtask, taskIndex, subtaskIndex) {
  const subtaskElement = document.createElement("div");
  subtaskElement.classList.add("subtask");

  subtaskElement.innerHTML = `
    <div><strong>${subtask.name}</strong></div>
    <div>${subtask.description}</div>
  `;
   if (subtask.tags && subtask.tags.length > 0) {
    subtask.tags.forEach(tag => {
      const tagElement = createTagElement(tag);
      subtaskElement.appendChild(tagElement);
    });
  }

  return subtaskElement;
}

// Function to create description element for task
function createDescriptionElement(description) {
  const descElement = document.createElement("div");
  descElement.textContent = description;
  return descElement;
}

// Function to create tag element
function createTagElement(tag) {
  const tagElement = document.createElement("div");
  tagElement.textContent = tag;
  tagElement.classList.add("tag-style");
  return tagElement;
}

// Function to add a task
function addTask() {
  const taskName = taskNameInput.value.trim();
  const taskDesc = taskDescInput.value.trim();
  const taskTags = taskTagsInput.value
    .trim()
    .split(",")
    .map((tag) => tag.trim());

  if (taskName && taskDesc) {
    const newTask = {
      name: taskName,
      description: taskDesc,
      tags: taskTags,
      subtasks: [],
    };

    tasks.push(newTask);
    renderTasks();
  }

  // Clear inputs and hide the form
  taskNameInput.value = "";
  taskDescInput.value = "";
  taskTagsInput.value = "";
  taskForm.classList.add("hidden");
}

// Function to cancel task creation and hide the form
function cancelTask() {
  taskForm.classList.add("hidden");
  taskNameInput.value = "";
  taskDescInput.value = "";
  taskTagsInput.value = "";
}

// Function to show the task form when "Add Task" is clicked
showTaskFormButton.addEventListener("click", () => {
  taskForm.classList.remove("hidden");
  taskForm.classList.add("show-form");
});

// Event listener to add a task
addTaskButton.addEventListener("click", addTask);

// Event listener to cancel task creation
cancelTaskButton.addEventListener("click", cancelTask);

// Function to toggle subtask form for each task (for adding a subtask)
function toggleSubtaskForm(taskIndex) {
  const task = tasks[taskIndex];
  const subtaskFormDiv = document.createElement("div");
  subtaskFormDiv.classList.add("subtask-form");

  subtaskFormDiv.innerHTML = `
  <div id="task-form" class="show-form">
    <input type="text" class="subtask-name" placeholder="Subtask Name">
    <textarea class="subtask-desc" placeholder="Subtask Description"></textarea>
    <input type="text" class="subtask-tags" placeholder="Tags (comma separated)">
    <button class="add-subtask-btn">Add Subtask</button>
    <button class="cancel-subtask-btn">Cancel</button>
  </div>
  `;

  // Add the subtask form below the task
  const taskElement = tasksList.children[taskIndex];
  taskElement.appendChild(subtaskFormDiv);

  // Handle adding a subtask
  subtaskFormDiv
    .querySelector(".add-subtask-btn")
    .addEventListener("click", () => {
      const subtaskName = subtaskFormDiv
        .querySelector(".subtask-name")
        .value.trim();
      const subtaskDesc = subtaskFormDiv
        .querySelector(".subtask-desc")
        .value.trim();
      const subtaskTags = subtaskFormDiv
        .querySelector(".subtask-tags")
        .value.trim()
        .split(",")
        .map((tag) => tag.trim());

      if (subtaskName && subtaskDesc) {
        const newSubtask = {
          name: subtaskName,
          description: subtaskDesc,
          tags: subtaskTags,
        };

        // Add subtask to the task
        tasks[taskIndex].subtasks.push(newSubtask);
        renderTasks();
      }

      // Clear and hide the subtask form
      subtaskFormDiv.querySelector(".subtask-name").value = "";
      subtaskFormDiv.querySelector(".subtask-desc").value = "";
      subtaskFormDiv.querySelector(".subtask-tags").value = "";
      taskElement.removeChild(subtaskFormDiv);
    });

  // Handle canceling subtask addition
  subtaskFormDiv
    .querySelector(".cancel-subtask-btn")
    .addEventListener("click", () => {
      taskElement.removeChild(subtaskFormDiv);
    });
}

// Initial render
renderTasks();

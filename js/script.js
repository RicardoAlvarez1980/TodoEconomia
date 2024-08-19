let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskPriorityInput = document.getElementById("priorityInput");
  const taskText = taskInput.value.trim();
  const taskPriority = parseInt(taskPriorityInput.value);

  if (taskText === "") {
    alert("Por favor ingrese una tarea");
    return;
  }

  const task = {
    text: taskText,
    priority: taskPriority,
    creationDate: new Date(),
    modificationDate: new Date(),
  };

  tasks.push(task);
  renderTasks();
  clearInputs();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "list-group-item d-flex justify-content-between align-items-center";

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.className = "mr-3";
    taskCheck.onclick = function(event) {
      event.stopPropagation();
      toggleTaskDone(taskTextSpan);
    };

    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = `${task.text} (Prioridad: ${task.priority})`;
    taskTextSpan.className = "task-text";

    const taskDetailsSpan = document.createElement("span");
    taskDetailsSpan.className = "badge badge-primary badge-pill";
    taskDetailsSpan.textContent = `Creado: ${formatDate(task.creationDate)} | Modificado: ${formatDate(task.modificationDate)}`;

    const taskEditBtn = document.createElement("button");
    taskEditBtn.textContent = "Editar";
    taskEditBtn.className = "btn btn-warning btn-sm btn-edit";
    taskEditBtn.onclick = function(event) {
      event.stopPropagation();
      editTask(index);
    };

    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.textContent = "Eliminar";
    taskDeleteBtn.className = "btn btn-danger btn-sm";
    taskDeleteBtn.onclick = function(event) {
      event.stopPropagation();
      deleteTask(index);
    };

    taskItem.appendChild(taskCheck);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(taskDetailsSpan);
    taskItem.appendChild(taskEditBtn);
    taskItem.appendChild(taskDeleteBtn);

    taskList.appendChild(taskItem);
  });
}

function toggleTaskDone(taskTextSpan) {
  taskTextSpan.classList.toggle("task-done");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Editar tarea:", tasks[index].text);
  const newPriority = prompt("Editar prioridad (1-5):", tasks[index].priority);

  if (newText !== null && newText.trim() !== "" && newPriority !== null && !isNaN(newPriority)) {
    tasks[index].text = newText.trim();
    tasks[index].priority = parseInt(newPriority);
    tasks[index].modificationDate = new Date();
    renderTasks();
  }
}

// Función para ordenar tareas
function sortTasks(criteria) {
  if (criteria === "priority") {
    tasks.sort((a, b) => a.priority - b.priority);
  } else if (criteria === "modification") {
    tasks.sort((a, b) => new Date(b.modificationDate) - new Date(a.modificationDate));
  }
  renderTasks();
}

// Formatea las fechas en un formato legible
function formatDate(date) {
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function clearInputs() {
  document.getElementById("taskInput").value = "";
  document.getElementById("priorityInput").value = "1";
}

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDate");
  const categorySelect = document.getElementById("category");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const notification = document.getElementById("notification");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = createTaskElement(task, index);
      taskList.appendChild(li);
    });
  }

  function createTaskElement(task, index) {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${
              task.completed ? "checked" : ""
            }>
            <span class="task-text">${task.text}</span>
            <span class="task-due-date">${task.dueDate}</span>
            <span class="task-category">${task.category}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;

    const checkbox = li.querySelector(".task-checkbox");
    checkbox.addEventListener("change", () => toggleTaskComplete(index));

    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    return li;
  }

  function addTask() {
    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const category = categorySelect.value;

    if (text) {
      const newTask = { text, dueDate, category, completed: false };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      resetInputs();
      showNotification("Task added successfully!");
    } else {
      showNotification("Please enter a task!", "error");
    }
  }

  function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    showNotification("Task deleted successfully!");
  }

  function resetInputs() {
    taskInput.value = "";
    dueDateInput.value = "";
    categorySelect.value = "";
  }

  function showNotification(message, type = "success") {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  function filterTasks(filter) {
    const filteredTasks = tasks.filter((task) => {
      if (filter === "all") return true;
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
    });

    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
      const li = createTaskElement(task, index);
      taskList.appendChild(li);
    });
  }

  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterTasks(button.dataset.filter);
    });
  });

  renderTasks();
});

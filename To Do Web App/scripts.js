const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');
const completedList = document.getElementById('completedList');
const addTaskButton = document.getElementById('addTaskButton');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        const timeString = currentDate.toLocaleTimeString();

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <span class="date">${dateString} ${timeString}</span>
            <button class="completeButton">Complete</button>
            <button class="editButton">Edit</button>
            <button class="deleteButton">Delete</button>
        `;

        todoList.appendChild(taskItem);
        taskInput.value = '';
    }
}

// Add event delegation for dynamic buttons
document.addEventListener('click', function (event) {
    const target = event.target;
    
    if (target.classList.contains('completeButton')) {
        completeTask(target);
    } else if (target.classList.contains('editButton')) {
        editTask(target);
    } else if (target.classList.contains('deleteButton')) {
        deleteTask(target);
    }
});

function completeTask(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle('completed');
    completedList.appendChild(taskItem);
}

function editTask(button) {
    const taskItem = button.parentNode;
    const taskText = taskItem.querySelector('span');
    const newText = prompt('Edit task:', taskText.textContent);

    if (newText !== null) {
        taskText.textContent = newText;
    }
}

function deleteTask(button) {
    const taskItem = button.parentNode;
    taskItem.parentNode.removeChild(taskItem);
}

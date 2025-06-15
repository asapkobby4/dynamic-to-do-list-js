document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        // Prevent empty task entries
        if (!taskText || taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item for task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
           const removeBtn = document.createElement('button');
           removeBtn.textContent = 'Remove';
           removeBtn.classList.add('remove-btn');


        // Remove the task from the list and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        };

        // Append button and item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if required
        if (save) {
            saveToLocalStorage(taskText);
        }
    }

    // Save task to Local Storage
    function saveToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove task from Local Storage
    function removeFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Load tasks from Local Storage and display
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Event listener for button click
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    });

    // Allow task addition via Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            } else {
                alert('Please enter a task.');
            }
        }
    });
});

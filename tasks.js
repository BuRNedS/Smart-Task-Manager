document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list-placeholder');
    let tasks = [];
  
    // Function to add a task
    const addTask = (title, description, dueDate, priority) => {
      const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority,
        completed: false
      };
      tasks.push(task);
      renderTasks();
    };
  
    // Function to render tasks
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.priority.toLowerCase()}`;
        taskItem.innerHTML = `
          <div class="task-header">
            <h3>${task.title}</h3>
            <button class="delete-task" data-id="${task.id}">Delete</button>
          </div>
          <p>${task.description || 'No description provided.'}</p>
          <p><strong>Due Date:</strong> ${task.dueDate}</p>
          <div class="task-actions">
            <label>
              <input type="checkbox" class="complete-task" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
              Mark as Completed
            </label>
          </div>
        `;
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
      });
    };
  
    // Function to validate form inputs
    const validateForm = (title, dueDate) => {
      if (!title || !dueDate) {
        alert('Title and Due Date are required!');
        return false;
      }
      return true;
    };
  
    // Event Listener for form submission
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('task-title').value.trim();
      const description = document.getElementById('task-desc').value.trim();
      const dueDate = document.getElementById('task-date').value;
      const priority = document.getElementById('task-priority').value;
  
      if (validateForm(title, dueDate)) {
        addTask(title, description, dueDate, priority);
        taskForm.reset();
      }
    });
  
    // Event Listener for task actions (delete and mark as completed)
    taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-task')) {
        const taskId = parseInt(e.target.dataset.id);
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
      } else if (e.target.classList.contains('complete-task')) {
        const taskId = parseInt(e.target.dataset.id);
        tasks = tasks.map(task => task.id === taskId ? { ...task, completed: e.target.checked } : task);
        renderTasks();
      }
    });
  });
  
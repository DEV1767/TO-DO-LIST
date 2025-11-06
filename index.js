
    document.addEventListener('DOMContentLoaded', () => {
      const todoinput = document.getElementById("to-do");
      const addbtn = document.getElementById("Add-btn");
      const taskList = document.querySelector(".task ul");

      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      tasks.forEach(renderTask);

      addbtn.addEventListener('click', () => {
        const text = todoinput.value.trim();
        if (text === "") return;

        const newTask = {
          id: Date.now(),
          text,
          completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoinput.value = "";
      });

      function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = task.text;

        const btnDiv = document.createElement('div');
        btnDiv.classList.add('btns');

        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Done';
        doneBtn.addEventListener('click', () => toggleComplete(task.id));

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList.add('delete');
        delBtn.addEventListener('click', () => deleteTask(task.id));

        btnDiv.appendChild(doneBtn);
        btnDiv.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(btnDiv);
        taskList.appendChild(li);
      }

      function toggleComplete(id) {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTasks();
        refreshList();
      }

      function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        refreshList();
      }

      function refreshList() {
        taskList.innerHTML = "";
        tasks.forEach(renderTask);
      }

      function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
  
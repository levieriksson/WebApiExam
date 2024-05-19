// 'use client';

// import React, { useEffect, useState } from 'react';
// import TaskList from '../../components/TaskList';
// import AddTaskForm from '../../components/AddTaskForm';
// import styles from './Tasks.module.css'; // Import CSS module
// import fetcher from '../../utils/fetcher';

// const TasksPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState(null);
//   const [showAddTaskForm, setShowAddTaskForm] = useState(false);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const data = await fetcher('/tasks');
//         setTasks(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleToggleAddTaskForm = () => {
//     setShowAddTaskForm(!showAddTaskForm);
//   };

//   const handleTaskAdded = (newTask) => {
//     setTasks((prevTasks) => [...prevTasks, newTask]);
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Tasks</h1>
//       {error && <p>Error: {error}</p>}
//       <TaskList tasks={tasks} />
//       <button onClick={handleToggleAddTaskForm} className={styles.formButton}>
//         {showAddTaskForm ? 'Hide Form' : 'Add New Task'}
//       </button>
//       {showAddTaskForm && <AddTaskForm onTaskAdded={handleTaskAdded} />}
//     </div>
//   );
// };

// export default TasksPage;
// pages/tasks/index.js
// pages/tasks/index.js
// pages/tasks/index.js
// pages/tasks/index.js
'use client';

import React, { useEffect, useState } from 'react';
import TaskList from '../../components/TaskList';
import AddTaskForm from '../../components/AddTaskForm';
import styles from './Tasks.module.css'; // Import CSS module
import fetcher from '../../utils/fetcher';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetcher('/tasks');
        setTasks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
    setTaskToEdit(null); // Reset the task to edit when toggling the form
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddTaskForm(false); // Close the form after adding a new task
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.taskId === updatedTask.taskId ? updatedTask : task))
    );
    setTaskToEdit(null); // Reset the task to edit after updating
    setShowAddTaskForm(false); // Hide form after update
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowAddTaskForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetcher(`/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Tasks</h1>
      {error && <p>Error: {error}</p>}
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      <button onClick={handleToggleAddTaskForm} className={styles.formButton}>
        {showAddTaskForm ? 'Hide Form' : 'Add New Task'}
      </button>
      {showAddTaskForm && (
        <AddTaskForm
          onTaskAdded={handleTaskAdded}
          taskToEdit={taskToEdit}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default TasksPage;




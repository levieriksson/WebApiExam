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
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className={styles.container}>
      <h1>Tasks</h1>
      {error && <p>Error: {error}</p>}
      <TaskList tasks={tasks} />
      <button onClick={handleToggleAddTaskForm} className={styles.formButton}>
        {showAddTaskForm ? 'Hide Form' : 'Add New Task'}
      </button>
      {showAddTaskForm && <AddTaskForm onTaskAdded={handleTaskAdded} />}
    </div>
  );
};

export default TasksPage;

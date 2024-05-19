'use client';

import React, { useEffect, useState } from 'react';
import TaskList from '../../components/TaskList';
import AddTaskForm from '../../components/AddTaskForm';
import styles from './Tasks.module.css'; // Import CSS module
import fetcher from '../../utils/fetcher';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await fetcher('/tasks');
      

      const currentUtcDate = new Date(new Date().toUTCString());
      const currentTasks = data.filter((task) => task.status !== 'Completed');
      const completed = data.filter((task) => {
        if (!task.updatedAt) return false;
        const updatedAtDate = new Date(task.updatedAt);
        const sevenDaysAgo = new Date(currentUtcDate);
        sevenDaysAgo.setDate(currentUtcDate.getDate() - 7);
        
        return task.status === 'Completed' && updatedAtDate > sevenDaysAgo;
      });

      setTasks(currentTasks);
      setCompletedTasks(completed);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggleAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
    setTaskToEdit(null);
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddTaskForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    fetchTasks();
    setTaskToEdit(null);
    setShowAddTaskForm(false);
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
      setCompletedTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t.taskId === taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        status: 'Completed',
        updatedAt: new Date().toISOString(), // Ensure updatedAt is set to the current date and time
      };

      await fetcher(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Active</h1>
      {error && <p>Error: {error}</p>}
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onComplete={handleCompleteTask} />
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
      <h2 className={styles.completedTasksHeading}>Completed (Last 7 days)</h2>
      <div className={styles.completedTasksList}>
        <TaskList tasks={completedTasks} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
};

export default TasksPage;

'use client';

import React, { useEffect, useState } from 'react';
import fetcher from '../../utils/fetcher';
import TaskList from '../../components/TaskList';
import AddTaskForm from '../../components/AddTaskForm';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

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

  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div>
      <h1>Tasks</h1>
      {error && <p>Error: {error}</p>}
      <TaskList tasks={tasks} />
      <AddTaskForm onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default Tasks;

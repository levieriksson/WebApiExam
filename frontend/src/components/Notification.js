'use client';

import React, { useEffect, useState } from 'react';
import fetcher from '../utils/fetcher';
import notify from '../utils/NotificationManager';
import styles from './Notification.module.css';

const Notification = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetcher('/tasks');
        setTasks(data);

        const now = new Date();
        const upcomingTasks = data.filter(task => {
          const taskDueDate = new Date(task.dueDate);
          const timeDiff = taskDueDate - now;
          return timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000;
        });

        if (upcomingTasks.length > 0) {
          upcomingTasks.forEach(task => {
            const taskDate = new Date(task.dueDate).toLocaleString();
            notify(`Upcoming deadline for task: ${task.title} on ${taskDate}`);
          });
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.notificationContainer}>
      {error && <p>Error: {error}</p>}
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.taskId}>
              <strong>{task.title}</strong> - {new Date(task.dueDate).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming deadlines.</p>
      )}
    </div>
  );
};

export default Notification;

// src/app/page.js
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from '@/app/home/home.module.css';
import notify from '@/utils/NotificationManager';
import fetcher from '@/utils/fetcher';

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [username, setUsername] = useState('Levi');
  const notifiedTasks = useRef(new Set());

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    setCurrentDate(formattedDate);
    setCurrentTime(`${formattedTime}`);

    const fetchTasks = async () => {
      try {
        const tasks = await fetcher('/tasks');
        console.log('Fetched tasks:', tasks);

        const activeTasks = tasks.filter(task => task.status !== 'Completed');
        console.log('Active tasks:', activeTasks);

        const upcoming = [];

        activeTasks.forEach(task => {
          const dueDate = new Date(task.dueDate);
          const now = new Date();
          const timeDiff = dueDate.getTime() - now.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          if (daysDiff <= 2 && !notifiedTasks.current.has(task.taskId)) {
            console.log(`Task "${task.title}" has an upcoming deadline on ${dueDate.toLocaleString('en-US', { hour12: false })}`);
            notify(`Upcoming deadline for task: ${task.title} on ${dueDate.toLocaleString('en-US', { hour12: false })}`);
            notifiedTasks.current.add(task.taskId);
          }
          if (daysDiff <= 2) {
            upcoming.push(task);
          }
        });

        console.log('Upcoming tasks:', upcoming);
        setUpcomingTasks(upcoming);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.centerContent}>
        <h1>Welcome {username}</h1>
        <p className={styles.currentDate}>{currentDate}</p>
        <p className={styles.currentTime}>{currentTime}</p>
        <h2>Upcoming Deadlines</h2>
        {upcomingTasks.length > 0 ? (
          <ul className={styles.taskList}>
            {upcomingTasks.map(task => (
              <li key={task.taskId} className={styles.taskItem}>
                <strong>{task.title}</strong> - {new Date(task.dueDate).toLocaleDateString('en-CA')} {new Date(task.dueDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming deadlines.</p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default HomePage;

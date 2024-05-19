// src/app/home/page.js
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from '@/app/home/home.module.css';
import notify from '@/utils/NotificationManager';
import fetcher from '@/utils/fetcher';

const HomePage = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [username, setUsername] = useState('Levi');
  const [countdowns, setCountdowns] = useState({});
  const notifiedTasks = useRef(new Set());

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    setCurrentDateTime(`${formattedDate}, ${formattedTime}`);

    const fetchTasks = async () => {
      try {
        const tasks = await fetcher('/tasks');
        

        const activeTasks = tasks.filter(task => task.status !== 'Completed');
        

        const upcoming = [];

        activeTasks.forEach(task => {
          const dueDate = new Date(task.dueDate);
          const now = new Date();
          const timeDiff = dueDate.getTime() - now.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          if (daysDiff <= 2 && !notifiedTasks.current.has(task.taskId)) {
            
            notify(`Upcoming deadline for task: ${task.title} on ${dueDate.toLocaleString('en-US', { hour12: false })}`);
            notifiedTasks.current.add(task.taskId);
          }
          if (daysDiff <= 2) {
            upcoming.push(task);
          }
        });

        
        setUpcomingTasks(upcoming);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const calculateCountdown = (dueDate) => {
      const now = new Date();
      const timeDiff = new Date(dueDate) - now;
      if (timeDiff <= 0) {
        return 'Expired';
      }
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    const updateCountdowns = () => {
      const newCountdowns = {};
      upcomingTasks.forEach(task => {
        newCountdowns[task.taskId] = calculateCountdown(task.dueDate);
      });
      setCountdowns(newCountdowns);
    };

    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [upcomingTasks]);

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.centerContent}>
        <h1>Welcome {username}</h1>
        <p>{currentDateTime}</p>
        <h2>Upcoming Deadlines</h2>
        {upcomingTasks.length > 0 ? (
          <ul className={styles.taskList}>
            {upcomingTasks.map(task => (
              <li key={task.taskId} className={styles.taskItem}>
                <strong>{task.title}</strong> - {new Date(task.dueDate).toLocaleDateString('sv-SE')} {new Date(task.dueDate).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })} <br />
                <span className={styles.countdown}>Time left: {countdowns[task.taskId]}</span>
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

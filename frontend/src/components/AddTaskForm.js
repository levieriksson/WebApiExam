'use client';

import React, { useState } from 'react';
import fetcher from '../utils/fetcher';
import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      status,
    };

    try {
      const response = await fetcher('/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
      });

      onTaskAdded(response);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('');
      setStatus('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Add New Task</h2>
      {error && <p>Error: {error}</p>}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Due Date</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Priority</label>
        <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.formInput}
          required
        />
      </div>
      <button type="submit" className={styles.formButton}>Add Task</button>
    </form>
  );
};

export default AddTaskForm;

// src/components/AddTaskForm.js
'use client';

import React, { useState, useEffect } from 'react';
import fetcher from '../utils/fetcher';
import styles from '../app/tasks/Tasks.module.css';

const AddTaskForm = ({ onTaskAdded, taskToEdit, onTaskUpdated, defaultDate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(new Date(taskToEdit.dueDate).toISOString().substring(0, 16));
      setPriority(taskToEdit.priority);
    } else {
      const defaultDateTime = defaultDate || new Date();
      const placeholderTime = 'T14:00';
      const dateStr = defaultDateTime.toISOString().split('T')[0];
      setDueDate(`${dateStr}${placeholderTime}`);
    }
  }, [taskToEdit, defaultDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      status: 'Active',
    };

    try {
      if (taskToEdit) {
        const response = await fetcher(`/tasks/${taskToEdit.taskId}`, {
          method: 'PUT',
          body: JSON.stringify(newTask),
        });
        onTaskUpdated(response);
      } else {
        const response = await fetcher('/tasks', {
          method: 'POST',
          body: JSON.stringify(newTask),
        });
        onTaskAdded(response);
      }

      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.formInput}
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <button type="submit" className={styles.formButton}>
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default AddTaskForm;

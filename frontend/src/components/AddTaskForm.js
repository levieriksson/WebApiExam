'use client';

import React, { useState } from 'react';
import fetcher from '../utils/fetcher';

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
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      {error && <p>Error: {error}</p>}
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Priority</label>
        <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;

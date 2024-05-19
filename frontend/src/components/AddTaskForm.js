// // 'use client';

// // import React, { useState } from 'react';
// // import fetcher from '../utils/fetcher';
// // import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

// // const AddTaskForm = ({ onTaskAdded }) => {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [dueDate, setDueDate] = useState('');
// //   const [priority, setPriority] = useState('');
// //   const [status, setStatus] = useState('');
// //   const [error, setError] = useState(null);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     const newTask = {
// //       title,
// //       description,
// //       dueDate,
// //       priority,
// //       status,
// //     };

// //     try {
// //       const response = await fetcher('/tasks', {
// //         method: 'POST',
// //         body: JSON.stringify(newTask),
// //       });

// //       onTaskAdded(response);
// //       setTitle('');
// //       setDescription('');
// //       setDueDate('');
// //       setPriority('');
// //       setStatus('');
// //     } catch (error) {
// //       setError(error.message);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className={styles.formContainer}>
// //       <h2>Add New Task</h2>
// //       {error && <p>Error: {error}</p>}
// //       <div className={styles.formGroup}>
// //         <label className={styles.formLabel}>Title</label>
// //         <input
// //           type="text"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           className={styles.formInput}
// //           required
// //         />
// //       </div>
// //       <div className={styles.formGroup}>
// //         <label className={styles.formLabel}>Description</label>
// //         <input
// //           type="text"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           className={styles.formInput}
// //           required
// //         />
// //       </div>
// //       <div className={styles.formGroup}>
// //         <label className={styles.formLabel}>Due Date</label>
// //         <input
// //           type="datetime-local"
// //           value={dueDate}
// //           onChange={(e) => setDueDate(e.target.value)}
// //           className={styles.formInput}
// //           required
// //         />
// //       </div>
// //       <div className={styles.formGroup}>
// //         <label className={styles.formLabel}>Priority</label>
// //         <input
// //           type="text"
// //           value={priority}
// //           onChange={(e) => setPriority(e.target.value)}
// //           className={styles.formInput}
// //           required
// //         />
// //       </div>
// //       <div className={styles.formGroup}>
// //         <label className={styles.formLabel}>Status</label>
// //         <input
// //           type="text"
// //           value={status}
// //           onChange={(e) => setStatus(e.target.value)}
// //           className={styles.formInput}
// //           required
// //         />
// //       </div>
// //       <button type="submit" className={styles.formButton}>Add Task</button>
// //     </form>
// //   );
// // };

// // export default AddTaskForm;
// // components/AddTaskForm.js
// // components/AddTaskForm.js
// // components/AddTaskForm.js
// 'use client';

// import React, { useState, useEffect } from 'react';
// import fetcher from '../utils/fetcher';
// import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

// const AddTaskForm = ({ onTaskAdded, taskToEdit, onTaskUpdated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [priority, setPriority] = useState('');
//   const [status, setStatus] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (taskToEdit) {
//       setTitle(taskToEdit.title);
//       setDescription(taskToEdit.description);
//       setDueDate(formatDate(taskToEdit.dueDate));
//       setPriority(taskToEdit.priority);
//       setStatus(taskToEdit.status);
//     }
//   }, [taskToEdit]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const taskData = {
//       title,
//       description,
//       dueDate,
//       priority,
//       status,
//     };

//     try {
//       if (taskToEdit) {
//         const response = await fetcher(`/tasks/${taskToEdit.taskId}`, {
//           method: 'PUT',
//           body: JSON.stringify(taskData),
//         });
//         onTaskUpdated(response);
//       } else {
//         const response = await fetcher('/tasks', {
//           method: 'POST',
//           body: JSON.stringify(taskData),
//         });
//         onTaskAdded(response);
//       }
//       setTitle('');
//       setDescription('');
//       setDueDate('');
//       setPriority('');
//       setStatus('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.formContainer}>
//       <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
//       {error && <p>Error: {error}</p>}
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className={styles.formInput}
//           required
//         />
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Description</label>
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className={styles.formInput}
//           required
//         />
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Due Date</label>
//         <input
//           type="datetime-local"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className={styles.formInput}
//           required
//         />
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Priority</label>
//         <input
//           type="text"
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//           className={styles.formInput}
//           required
//         />
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Status</label>
//         <input
//           type="text"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className={styles.formInput}
//           required
//         />
//       </div>
//       <button type="submit" className={styles.formButton}>
//         {taskToEdit ? 'Update Task' : 'Add Task'}
//       </button>
//     </form>
//   );
// };

// export default AddTaskForm;

// components/AddTaskForm.js
// components/AddTaskForm.js
// components/AddTaskForm.js
'use client';

import React, { useState, useEffect } from 'react';
import fetcher from '../utils/fetcher';
import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

const AddTaskForm = ({ onTaskAdded, defaultDate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (defaultDate) {
      const placeholderTime = 'T12:00';
      const dateStr = defaultDate.toISOString().split('T')[0];
      setDueDate(`${dateStr}${placeholderTime}`);
    }
  }, [defaultDate]);

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

      onTaskAdded(response); // Call the onTaskAdded prop with the response
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




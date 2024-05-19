
import React from 'react';
import styles from '../app/tasks/Tasks.module.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);
  const formattedTime = date.toTimeString().slice(0, 5);
  return `${formattedDate} ${formattedTime}`;
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.taskId}>
            <td>{task.title}</td>
            <td>{task.priority}</td>
            <td>{formatDate(task.dueDate)}</td>
            <td>
              <button onClick={() => onEdit(task)} className={styles.editButton}>
                Edit
              </button>
              <button onClick={() => onDelete(task.taskId)} className={styles.deleteButton}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;




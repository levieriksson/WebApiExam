import React from 'react';
import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

const TaskList = ({ tasks }) => {
  return (
    <table className={styles.taskTable}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Priority</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.taskId}>
            <td>{task.title}</td>
            <td>{task.priority}</td>
            <td>{new Date(task.dueDate).toLocaleDateString('en-CA')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;

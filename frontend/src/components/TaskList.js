// import React from 'react';
// import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

// const TaskList = ({ tasks }) => {
//   return (
//     <table className={styles.taskTable}>
//       <thead>
//         <tr>
//           <th>Title</th>
//           <th>Priority</th>
//           <th>Due Date</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tasks.map(task => (
//           <tr key={task.taskId}>
//             <td>{task.title}</td>
//             <td>{task.priority}</td>
//             <td>{new Date(task.dueDate).toLocaleDateString('en-CA')}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TaskList;

// components/TaskList.js
// components/TaskList.js
// components/TaskList.js
// components/TaskList.js
import React from 'react';
import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

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




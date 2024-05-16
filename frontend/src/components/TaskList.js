import React from 'react';

const TaskList = ({ tasks }) => {
  console.log('Tasks:', tasks); // Log tasks for debugging

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.taskId}>{task.title} {task.dueDate} {task.priority}</li> // Use taskId as the unique key
      ))}
    </ul>
  );
};

export default TaskList;

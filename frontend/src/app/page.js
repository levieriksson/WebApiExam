import React from 'react';
import styles from './tasks/Tasks.module.css'; // Import CSS module

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
    </div>
  );
};

export default Home;

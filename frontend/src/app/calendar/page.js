'use client';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import fetcher from '@/utils/fetcher';
import styles from './Calendar.module.css';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTasks, setSelectedTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetcher('/tasks');
                setTasks(response);
                console.log('Fetched tasks:', response);
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
            }
        };
        fetchTasks();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const tasksForDate = tasks.filter(
            (task) => new Date(task.dueDate).toDateString() === date.toDateString()
        );
        setSelectedTasks(tasksForDate);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const hasTasks = tasks.some(
                (task) => new Date(task.dueDate).toDateString() === date.toDateString()
            );
            return hasTasks ? styles.highlight : null;
        }
    };

    return (
        <div className={styles.container}>
            <h1>Calendar</h1>
            <div className={styles.calendar}>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileClassName={tileClassName}
                    style={{ width: '700px' }} // Set the width directly here
                />
            </div>
            <div className={styles.tasksList}>
                <h2>Tasks for {selectedDate.toDateString()}</h2>
                {selectedTasks.length > 0 ? (
                    selectedTasks.map((task) => (
                        <div key={task.taskId} className={styles.taskItem}>
                            <p><strong>Title:</strong> {task.title}</p>
                            <p><strong>Description:</strong> {task.description}</p>
                            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
                            <p><strong>Priority:</strong> {task.priority}</p>
                            <p><strong>Status:</strong> {task.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No tasks for this date.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;

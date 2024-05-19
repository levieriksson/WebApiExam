// pages/calendar/index.js
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const formattedTime = date.toTimeString().slice(0, 5); // "HH:mm"
        return `${formattedDate} ${formattedTime}`;
    };

    const formatHeaderDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                <h2>Tasks for {formatHeaderDate(selectedDate)}</h2>
                {selectedTasks.length > 0 ? (
                    selectedTasks.map((task) => (
                        <div key={task.taskId} className={styles.taskItem}>
                            <p><strong>Title:</strong> {task.title}</p>
                            <p><strong>Description:</strong> {task.description}</p>
                            <p><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
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

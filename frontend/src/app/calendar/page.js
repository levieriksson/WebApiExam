
'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import fetcher from '@/utils/fetcher';
import AddTaskForm from '../../components/AddTaskForm';
import styles from './Calendar.module.css';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

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
        const selectedDateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        setSelectedDate(selectedDateUTC);
        const tasksForDate = tasks.filter(
            (task) => {
                const taskDueDateUTC = new Date(Date.UTC(
                    new Date(task.dueDate).getFullYear(),
                    new Date(task.dueDate).getMonth(),
                    new Date(task.dueDate).getDate()
                ));
                return taskDueDateUTC.toDateString() === selectedDateUTC.toDateString();
            }
        );
        setSelectedTasks(tasksForDate);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const hasTasks = tasks.some(
                (task) => {
                    const taskDueDateUTC = new Date(Date.UTC(
                        new Date(task.dueDate).getFullYear(),
                        new Date(task.dueDate).getMonth(),
                        new Date(task.dueDate).getDate()
                    ));
                    return taskDueDateUTC.toDateString() === dateUTC.toDateString();
                }
            );
            return hasTasks ? styles.highlight : null;
        }
    };

    const handleToggleAddTaskForm = () => {
        setShowAddTaskForm(!showAddTaskForm);
    };

    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setShowAddTaskForm(false);
    };

    return (
        <div className={styles.container}>
            <h1>Calendar</h1>
            <div className={styles.calendar}>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileClassName={tileClassName}
                    style={{ width: '700px' }}
                />
            </div>
            <button onClick={handleToggleAddTaskForm} className={styles.formButton}>
                {showAddTaskForm ? 'Hide Form' : 'Add New Task'}
            </button>
            {showAddTaskForm && <AddTaskForm onTaskAdded={handleTaskAdded} defaultDate={selectedDate} />}
            <div className={styles.tasksList}>
                <h2>Tasks for {selectedDate.toISOString().split('T')[0]}</h2>
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


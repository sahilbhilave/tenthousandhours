import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

const defaultGoals = [100, 500, 1000];

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks only when add task button is clicked
  const addTask = () => {
    if (newTaskTitle.trim() === '') return;
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      completedHours: 0,
      goalHours: defaultGoals[0],
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTaskTitle('');
  };

  // Update and delete functions only modify in-memory state.
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Your Tasks</h2>
      <div className="flex mb-6">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-6 py-3 rounded-r-xl hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </div>
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default Home;

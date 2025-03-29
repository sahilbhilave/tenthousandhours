import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import { Task } from '../types';

const Pomodoro: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks);
      const foundTask = tasks.find(t => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
      } else {
        navigate('/');
      }
    }
  }, [taskId, navigate]);

  // Each completed pomodoro adds 0.25 hours (15 minutes)
  const updateCompletedHours = (additionalHours: number) => {
    if (task) {
      const updatedTask = { ...task, completedHours: task.completedHours + additionalHours };
      setTask(updatedTask);
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const tasks: Task[] = JSON.parse(storedTasks);
        const newTasks = tasks.map(t => t.id === task.id ? updatedTask : t);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {task ? (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Pomodoro: {task.title}
          </h2>
          <Timer onComplete={() => updateCompletedHours(0.25)} />
          <p className="text-sm text-gray-600 mt-4">
            Each completed pomodoro adds 0.25 hours to your task.
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Pomodoro;

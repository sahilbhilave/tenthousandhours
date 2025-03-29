import React from 'react';
import { Task } from '../types';
import { Link } from 'react-router-dom';

interface TaskItemProps {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask }) => {
  const progressPercent = Math.min((task.completedHours / task.goalHours) * 100, 100);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md flex justify-between items-center transform hover:scale-105 transition-transform">
      <div className="w-full">
        <Link
          to={`/pomodoro/${task.id}`}
          className="text-2xl font-bold text-blue-600 hover:underline transition-colors"
        >
          {task.title}
        </Link>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {task.completedHours} hrs / {task.goalHours} hrs
          </p>
        </div>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;

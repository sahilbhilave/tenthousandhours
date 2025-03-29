import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="space-y-6">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center">
          No tasks yet. Add one above to get started!
        </p>
      )}
    </div>
  );
};

export default TaskList;

// src/pages/api/tasks.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getActiveTasks,
  getCompletedTasks,
  getAllTasks,
  completeTask,
  createTask,
  updateTask,
  deleteTask
} from '../../modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (typeof req.query.type === 'string') {
          if (req.query.type === 'active') {
            res.status(200).json(getActiveTasks());
          } else if (req.query.type === 'completed') {
            res.status(200).json(getCompletedTasks());
          } else {
            res.status(200).json(getAllTasks());
          }
        } else {
          res.status(400).json({ error: 'Invalid query parameter' });
        }
        break;

      case 'POST':
        const { title, description, persona, group } = req.body;
        if (title && description && persona && group) {
          createTask(title, description, persona, group);
          res.status(201).json({ message: 'Task created' });
        } else {
          res.status(400).json({ error: 'Missing required fields' });
        }
        break;

      case 'PUT':
        const { taskId, updatedTask } = req.body;
        if (taskId && updatedTask) {
          updateTask(taskId, updatedTask);
          res.status(200).json({ message: 'Task updated' });
        } else {
          res.status(400).json({ error: 'Missing required fields' });
        }
        break;

      case 'DELETE':
        const { id } = req.body;
        if (id) {
          deleteTask(id);
          res.status(200).json({ message: 'Task deleted' });
        } else {
          res.status(400).json({ error: 'Missing task ID' });
        }
        break;

      case 'PATCH':
        const { title: taskTitle } = req.body;
        if (taskTitle) {
          completeTask(taskTitle);
          res.status(200).json({ message: 'Task completed' });
        } else {
          res.status(400).json({ error: 'Missing task title' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

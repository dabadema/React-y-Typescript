import type { Request, Response } from 'express';
import Project from '../models/Project';
import Task from '../models/Task';

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);

            await Promise.allSettled([task.save(), req.project.save()]);
            res.send('Task created properly');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static getTasksByProjectId = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project');
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId).populate('project');

            if (!task) {
                const error = new Error('Task not found');
                res.status(404).json({ error: error.message });
            }
            if (task.project.id.toString() !== req.project.id) {
                const error = new Error('Not valid action');
                res.status(404).json({ error: error.message });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static updateTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findByIdAndUpdate(taskId, req.body).populate('project');

            if (!task) {
                const error = new Error('Task not found');
                res.status(404).json({ error: error.message });
            }
            if (task.project.id.toString() !== req.project.id) {
                const error = new Error('Not valid action');
                res.status(404).json({ error: error.message });
            }
            res.send({ message: 'Task updated properly' });
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static deleteTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId, req.body);

            if (!task) {
                const error = new Error('Task not found');
                res.status(404).json({ error: error.message });
            }

            req.project.tasks = req.project.tasks.filter((task) => task.id.toString() !== taskId);
            await Promise.allSettled([task.deleteOne(), req.project.save()]);

            res.send({ message: 'Task deleted properly' });
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };
}

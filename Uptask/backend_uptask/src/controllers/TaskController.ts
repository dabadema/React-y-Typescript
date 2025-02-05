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
            res.status(500).json({ error: 'Task not created' });
        }
    };

    static getTasksByProjectId = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project');
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Tasks not found' });
        }
    };

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.task.id).populate({
                path: 'completedBy',
                select: 'id name email',
            });

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Task not found' });
        }
    };

    static updateTaskById = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();

            res.send('Task updated properly');
        } catch (error) {
            res.status(500).json({ error: 'Task not updated' });
        }
    };

    static deleteTaskById = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(
                (task) => task.id.toString() !== req.task.id.toString()
            );
            await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

            res.send('Task deleted properly');
        } catch (error) {
            res.status(500).json({ error: 'Task not deleted' });
        }
    };

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            req.task.status = status;
            if (status === 'pending') {
                req.task.completedBy = null;
            } else {
                req.task.completedBy = req.user.id;
            }

            await req.task.save();

            res.send('Task status updated properly');
        } catch (error) {
            res.status(500).json({ error: 'Task status not updated' });
        }
    };
}

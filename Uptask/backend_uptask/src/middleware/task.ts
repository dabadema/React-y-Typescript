import type { Request, Response, NextFunction } from 'express';
import Task, { ITask } from '../models/Task';

declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        req.task = task;
        next();
    } catch (error) {
        res.status(500).json({ error: 'There was an error' });
        return;
    }
}
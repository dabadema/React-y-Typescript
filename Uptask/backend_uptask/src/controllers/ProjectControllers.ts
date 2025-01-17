import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        // Asigning project manager
        project.manager = req.user.id;

        console.log(req.user);

        try {
            await project.save();
            res.send('Project created properly');
        } catch (error) {
            res.status(500).json({ error: 'Project not created' });
        }
    };

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                //Conditional to just bring projects which the user is manager
                $or: [{ manager: { $in: req.user.id } }],
            });
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: 'Projects not found' });
        }
    };

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id).populate('tasks');

            if (!project) {
                const error = new Error('Project not found');
                res.status(404).json({ error: error.message });
            }
            res.json(project);
        } catch (error) {
            res.status(500).json({ error: 'Project not found' });
        }
    };

    static updateProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);
            if (!project) {
                const error = new Error('Project not found');
                res.status(404).json({ error: error.message });
            }
            project.clientName = req.body.clientName;
            project.projectName = req.body.projectName;
            project.description = req.body.description;
            await project.save();
            res.send('Project updated');
        } catch (error) {
            res.status(500).json({ error: 'Project not updated' });
        }
    };

    static deleteProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error('Project not found');
                res.status(404).json({ error: error.message });
            }
            await project.deleteOne();
            res.send('Project deleted');
        } catch (error) {
            res.status(500).json({ error: 'Project not deleted' });
        }
    };
}

import type { Request, Response } from 'express';

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        console.log(req.body);
        res.send('Creando proyecto...');
    };

    static getAllProjects = async (req: Request, res: Response) => {
        res.send('Todos los proyectos');
    };
}

import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectControllers';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.post(
    '/',
    body('projectName').notEmpty().withMessage('Project´s name is mandatory'),
    body('clientName').notEmpty().withMessage('Client´s name is mandatory'),
    body('description').notEmpty().withMessage('Project´s description is mandatory'),
    handleInputErrors,
    ProjectController.createProject
);
router.get('/', ProjectController.getAllProjects);

router.get(
    '/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    ProjectController.getProjectById
);

router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    body('projectName').notEmpty().withMessage('Project´s name is mandatory'),
    body('clientName').notEmpty().withMessage('Client´s name is mandatory'),
    body('description').notEmpty().withMessage('Project´s description is mandatory'),
    handleInputErrors,
    ProjectController.updateProjectById
);

router.delete(
    '/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    ProjectController.deleteProjectById
);

export default router;

import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectControllers';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { projectExists } from '../middleware/project';
import { taskBelongsToProject, taskExists } from '../middleware/task';
import { authenticate } from '../middleware/auth';
import { TeamMemberController } from '../controllers/TeamController';

const router = Router();

router.use(authenticate);

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

/** Routes for tasks */
router.param('projectId', projectExists);

router.post(
    '/:projectId/tasks',

    body('name').notEmpty().withMessage('Task´s name is mandatory'),
    body('description').notEmpty().withMessage('Task´s description is mandatory'),
    handleInputErrors,
    TaskController.createTask
);

router.get('/:projectId/tasks', TaskController.getTasksByProjectId);

router.param('taskId', taskExists);
router.param('taskId', taskBelongsToProject);

router.get(
    '/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    TaskController.getTaskById
);

router.put(
    '/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    body('name').notEmpty().withMessage('Task´s name is mandatory'),
    body('description').notEmpty().withMessage('Task´s description is mandatory'),
    handleInputErrors,
    TaskController.updateTaskById
);

router.delete(
    '/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    TaskController.deleteTaskById
);

router.post(
    '/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID not valid'),
    body('status').notEmpty().withMessage('Status is mandatory'),
    handleInputErrors,
    TaskController.updateTaskStatus
);

/** Routes for teams */

router.post(
    '/:projectId/team/find',
    body('email').isEmail().toLowerCase().withMessage('Not valid email'),
    handleInputErrors,
    TeamMemberController.findMemberById
);

router.post(
    '/:projectId/team',
    body('_id').isMongoId().withMessage('Not valid ID'),
    handleInputErrors,
    TeamMemberController.addMemberById
);

router.delete(
    '/:projectId/team',
    body('_id').isMongoId().withMessage('Not valid ID'),
    handleInputErrors,
    TeamMemberController.removeMemberById
);

export default router;

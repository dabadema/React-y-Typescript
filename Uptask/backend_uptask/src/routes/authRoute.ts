import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post(
    '/create-account',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
        body('password_confirmation').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords are not matching');
            }
            return true;
        }),
        body('name').notEmpty().withMessage('Name is required'),
    ],
    handleInputErrors,
    AuthController.createAccount
);

router.post(
    '/confirm-account',
    body('token').notEmpty().withMessage('Token is required'),
    handleInputErrors,
    AuthController.confirmAccount
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    handleInputErrors,
    AuthController.login
);

router.post(
    '/request-code',
    [body('email').isEmail().withMessage('Invalid email')],
    handleInputErrors,
    AuthController.requestConfirmationCode
);

router.post(
    '/forgot-password',
    [body('email').isEmail().withMessage('Invalid email')],
    handleInputErrors,
    AuthController.forgotPassword
);

export default router;

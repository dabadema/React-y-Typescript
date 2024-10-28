import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct } from './handlers/product';
import { handleInputErrors } from './middleware';
const router = Router();

router.get('/', (req, res) => {
    res.json('Desde GET');
});

router.post(
    '/',
    body('name').notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric()
        .withMessage('Not valid value')
        .notEmpty()
        .withMessage('Price is required')
        .custom((value) => value > 0)
        .withMessage('Price must be greater than 0'),
    handleInputErrors,
    createProduct
);

router.put('/', (req, res) => {
    res.json('Desde PUT');
});

router.patch('/', (req, res) => {
    res.json('Desde PATCH');
});

router.delete('/', (req, res) => {
    res.json('Desde DELETE');
});

export default router;

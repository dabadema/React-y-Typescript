import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateAvailability,
    updateProduct,
} from './handlers/product';
import { handleInputErrors } from './middleware';
const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the product
 *          example: 1
 *        name:
 *          type: string
 *          description: The Product name
 *          example: "Monitor Curvo de 49 Pulgadas"
 *        price:
 *          type: number
 *          description: The Product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The Product availability
 *          example: true
 */

router.get('/', getProducts);

router.get(
    '/:id',
    param('id').isInt().withMessage('Id must be a number'),
    handleInputErrors,
    getProductById
);

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

router.put(
    '/:id',
    param('id').isInt().withMessage('Id must be a number'),
    body('name').notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric()
        .withMessage('Not valid value')
        .notEmpty()
        .withMessage('Price is required')
        .custom((value) => value > 0)
        .withMessage('Price must be greater than 0'),
    body('availability').isBoolean().withMessage('Availability must be a boolean'),
    handleInputErrors,
    updateProduct
);

router.patch(
    '/:id',
    param('id').isInt().withMessage('Id must be a number'),
    handleInputErrors,
    updateAvailability
);

router.delete(
    '/:id',
    param('id').isInt().withMessage('Id must be a number'),
    handleInputErrors,
    deleteProduct
);

export default router;

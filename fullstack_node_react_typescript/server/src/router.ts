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

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags: [Products]
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successful response with the list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags: [Products]
 *    description: Return a product based on its unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The unique ID of the product
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response with the product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Product not found
 */
router.get(
    '/:id',
    param('id').isInt().withMessage('Id must be a number'),
    handleInputErrors,
    getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags: [Products]
 *    description: Create a new product with the provided details in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo de 49 Pulgadas"
 *              price:
 *                type: number
 *                example: 300
 *    responses:
 *      201:
 *        description: Product created successfully
 *      400:
 *        description: Bad request
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product by ID with user inputs
 *    tags: [Products]
 *    description: Update a product by ID with the provided details in the database
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The unique ID of the product
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo de 49 Pulgadas"
 *              price:
 *                type: number
 *                example: 300
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      201:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Product not found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Updates the product availability by ID
 *    tags: [Products]
 *    description: Returns the product availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The unique ID of the product
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Product availability updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Product not found
 */
router.patch(
    '/:id',
    param('id').isInt().withMessage('Id must be a number'),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by ID
 *    tags: [Products]
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The unique ID of the product
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Product deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Product deleted successfully"
 *      400:
 *        description: Bad request
 *      404:
 *        description: Product not found
 */
router.delete(
    '/:id',
    param('id').isInt().withMessage('Id must be a number'),
    handleInputErrors,
    deleteProduct
);

export default router;

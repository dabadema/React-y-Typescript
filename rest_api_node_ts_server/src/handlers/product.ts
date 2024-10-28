import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
    //Validating the response
    await check('name').notEmpty().withMessage('Name is required').run(req);
    await check('price')
        .isNumeric()
        .withMessage('Not valid value')
        .notEmpty()
        .withMessage('Price is required')
        .custom((value) => value > 0)
        .withMessage('Price must be greater than 0')
        .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.create(req.body);

    res.json({ data: product, message: 'Product created successfully' });
};

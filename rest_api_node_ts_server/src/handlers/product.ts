import { Request, Response } from 'express';
import Product from '../models/Product.model';
import router from '../router';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [['price', 'ASC']],
            attributes: { exclude: ['availability'] },
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.json({ data: product, message: 'Product created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [['price', 'ASC']],
            attributes: { exclude: ['availability', 'createdAt', 'updatedAt'] },
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.json({ data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            data: product,
            message: 'Product created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error,
        });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    await product.update(req.body);
    await product.save();

    res.json({ data: product, message: 'Product updated successfully' });
};

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    }

    product.availability = !product.availability;
    await product.save();

    console.log(product.dataValues);

    res.json({ data: product, message: 'Product updated successfully' });
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
};

import { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;

            /** Preventing duplicate accounts */
            const userExists = await User.findOne({ email });
            if (userExists) {
                const error = new Error('User already exists');
                res.status(409).json({ error: error.message });
                return;
            }

            const user = new User(req.body);

            // Hash password
            user.password = await hashPassword(password);

            await user.save();
            res.send('User account created, please check your email for confirmation');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };
}

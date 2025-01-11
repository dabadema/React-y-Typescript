import { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import Token from '../models/Token';
import { transporter } from '../config/nodemailer';

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

            /** Creating a new user */
            const user = new User(req.body);

            /** Hashing password */
            user.password = await hashPassword(password);

            /** Generating a token */
            const token = new Token();
            token.token = generateToken();
            token.userId = user.id;

            /** Sending confirmation email */
            await transporter.sendMail({
                from: 'UpTask <noreply@uptask.com>',
                to: user.email,
                subject: 'UpTask - Confirm your email',
                text: `Please confirm your email by clicking here: ${token.token}`,
                html: `<p>Please confirm your email by clicking here: <a href="${process.env.FRONTEND_URL}/confirm/${token.token}">Confirm email</a></p>`,
            });

            await Promise.allSettled([token.save(), user.save()]);

            res.send('User account created, please check your email for confirmation');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };
}

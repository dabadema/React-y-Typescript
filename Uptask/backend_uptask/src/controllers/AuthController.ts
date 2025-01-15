import { Request, Response } from 'express';
import User from '../models/User';
import { comparePassword, hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import Token from '../models/Token';
import { AuthEmail } from '../emails/AuthEmail';

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
            await AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });
            await Promise.allSettled([token.save(), user.save()]);

            res.send('User account created, please check your email for confirmation');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                const error = new Error('Token not found');
                res.status(401).json({ error: error.message });
                return;
            }
            const user = await User.findById(tokenExists.userId);
            user.confirmed = true;
            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.send('Account confirmed successfully');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('User not found');
                res.status(404).json({ error: error.message });
                return;
            }
            if (!user.confirmed) {
                const token = new Token();
                token.userId = user.id;
                token.token = generateToken();
                await token.save();

                await AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });

                const error = new Error(
                    'User account has not been confirmed, please check your email for confirmation'
                );
                res.status(401).json({ error: error.message });
                return;
            }

            //Checking if password is correct
            const isPasswordCorrect = await comparePassword(password, user.password);
            if (!isPasswordCorrect) {
                const error = new Error('Invalid password');
                res.status(401).json({ error: error.message });
                return;
            }

            res.send('User logged in successfully');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            /** Does the user exists? */
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('User it is not registered');
                res.status(404).json({ error: error.message });
                return;
            }
            /** Is it already confirmed? */
            if (user.confirmed) {
                const error = new Error('User it is already confirmed');
                res.status(403).json({ error: error.message });
                return;
            }

            /** Generating a token */
            const token = new Token();
            token.token = generateToken();
            token.userId = user.id;

            /** Sending confirmation email */
            await AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });
            await Promise.allSettled([token.save(), user.save()]);

            res.send('New token was sent to your email.');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            /** Does the user exists? */
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('User it is not registered');
                res.status(404).json({ error: error.message });
                return;
            }

            /** Generating a token */
            const token = new Token();
            token.token = generateToken();
            token.userId = user.id;
            await token.save();

            /** Sending confirmation email */
            await AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token,
            });

            res.send('Check your email for instructions');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                const error = new Error('Token not found');
                res.status(401).json({ error: error.message });
                return;
            }

            res.send('Token valid, set your new password');
        } catch (error) {
            res.status(500).json({ error: 'There was an error' });
        }
    };
}

import type { Request, Response } from 'express';
import User from '../models/User';

export class TeamMemberController {
    static findMemberById = async (req: Request, res: Response) => {
        const { email } = req.body;

        //Find user
        const user = await User.findOne({ email }).select('_id name email');
        if (!user) {
            const error = new Error('User not found');
            res.status(404).json({ error: error.message });
            return;
        }
        res.json(user);
    };
}

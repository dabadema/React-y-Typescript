import type { Request, Response } from 'express';
import  { INote } from '../models/Note';

export class NoteController {
    static createNote = async (req: Request, res: Response) {
        console.log(req.body)
    }
}
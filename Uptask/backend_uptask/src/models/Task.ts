import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
}

export const TaskSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        descrition: {
            type: String,
            trim: true,
            required: true,
        },
        project: {
            type: Types.ObjectId,
            ref: 'Project',
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;

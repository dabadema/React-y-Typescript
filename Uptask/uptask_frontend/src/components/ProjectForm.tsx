import { UseFormRegister, FieldErrors } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

type ProjectFormProps = {
    register: UseFormRegister<{
        projectName: string;
        clientName: string;
        description: string;
    }>;
    errors: FieldErrors<{
        projectName: string;
        clientName: string;
        description: string;
    }>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Project´s name
                </label>
                <input
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Project´s name"
                    {...register('projectName', {
                        required: 'Project´s name is required',
                    })}
                />

                {errors.projectName && <ErrorMessage>{errors.projectName.message}</ErrorMessage>}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Client´s name
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Client´s name"
                    {...register('clientName', {
                        required: 'Client´s name is required',
                    })}
                />

                {errors.clientName && <ErrorMessage>{errors.clientName.message}</ErrorMessage>}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Project´s description"
                    {...register('description', {
                        required: 'Project´s description is required',
                    })}
                />

                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>
        </>
    );
}

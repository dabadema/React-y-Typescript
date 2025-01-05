import ProjectForm from '../ProjectForm';
import { Link } from 'react-router-dom';
import { ProjectFormData } from '@/types/index';
import { useForm } from 'react-hook-form';

export default function EditProjectForm() {
    const initialValues: ProjectFormData = {
        projectName: '',
        clientName: '',
        description: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const handleForm = () => {};

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Edit project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Fill the following form to edit the project.
                </p>
                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 transition-colors text-white text-xl font-bold cursor-pointer px-10 py-3 mt-5 "
                        to="/"
                    >
                        Back to projects
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm register={register} errors={errors} />{' '}
                    <input
                        type="submit"
                        value="Save changes"
                        className="bg-fuchsia-600 hover:bg-fuschia-700 font-bold cursor-pointer uppercase transition-colors text-white w-full p-3"
                    />
                </form>
            </div>
        </>
    );
}

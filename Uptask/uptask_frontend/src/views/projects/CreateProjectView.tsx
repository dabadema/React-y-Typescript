import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ProjectForm from '@/components/ProjectForm';
import { ProjectFormData } from 'types';
import { createProject } from '@/api/ProjectAPI';

export default function DashboardView() {
    const navigate = useNavigate();
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

    const handleForm = async (data: ProjectFormData) => {
        await createProject(data);
        navigate('/');
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Create project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Fill the following form to create a new project
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
                        value="Create project"
                        className="bg-fuchsia-600 hover:bg-fuschia-700 font-bold cursor-pointer uppercase transition-colors text-white w-full p-3"
                    />
                </form>
            </div>
        </>
    );
}

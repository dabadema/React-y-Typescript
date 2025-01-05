import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/api/ProjectAPI';

export default function DashboardView() {
    const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

    if (isLoading) return <div>Loading...</div>;
    console.log(data);

    if (data)
        return (
            <>
                <h1 className="text-5xl font-black">My projects</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Manage and track your projects.
                </p>
                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 transition-colors text-white text-xl font-bold cursor-pointer px-10 py-3 mt-5 "
                        to="/projects/create"
                    >
                        New project
                    </Link>
                </nav>

                {data.length ? (
                    <p>Projects found</p>
                ) : (
                    <p className="text-center py-20">
                        There are no projects yet {''}
                        <Link className="text-fuchsia-500 font-bold" to="/projects/create">
                            Create your first project!
                        </Link>
                    </p>
                )}
            </>
        );
}

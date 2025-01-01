import { Link } from 'react-router-dom';

export default function DashboardView() {
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
        </>
    );
}

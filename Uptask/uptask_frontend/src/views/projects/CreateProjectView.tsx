import { Link } from 'react-router-dom';

export default function DashboardView() {
    return (
        <>
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
        </>
    );
}

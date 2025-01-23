import AddMemberModal from '@/components/team/AddMemberModal';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ProjectTeamView() {
    const navigate = useNavigate();

    const params = useParams();

    const projectId = params.projectId!;

    return (
        <>
            <h1 className="text-5xl font-black">Team management</h1>
            <p className="text-2xl text-gray-500 font-light mt-5">
                Manage the team members for this project
            </p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + `?addMember=true`)}
                >
                    Add Team member
                </button>

                <Link
                    to={`/projects/${projectId}`}
                    className="bg-fuchsia-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                    Back to project
                </Link>

                <AddMemberModal />
            </nav>
        </>
    );
}

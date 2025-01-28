import { addUserToProject } from '@/api/TeamAPI';
import { TeamMember } from '@/types/index';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type SearchResultProps = {
    user: TeamMember;
};

export default function SearchResult({ user }: SearchResultProps) {
    const params = useParams();
    const projectId = params.projectId!;

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
        },
    });

    const handleAddUserToProject = () => {
        const data = {
            projectId,
            _id: user._id,
        };
        console.log(data);
        mutate(data);
    };

    return (
        <>
            <p className="mt-10 text-center font-bold"> Result: </p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                >
                    Add to project
                </button>
            </div>
        </>
    );
}

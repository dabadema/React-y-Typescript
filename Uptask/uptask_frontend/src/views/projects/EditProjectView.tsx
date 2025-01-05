import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/ProjectAPI';
import EditProjectForm from '@/components/projects/EditProjectForm';

export default function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <Navigate to="/404" />;

    if (data) return <EditProjectForm />;

    return <div>Edit Project View</div>;
}

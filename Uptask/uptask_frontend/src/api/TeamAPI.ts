import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { Project, TeamMember, TeamMemberForm } from '../types';

export async function findUserByEmail({
    projectId,
    formData,
}: {
    projectId: Project['_id'];
    formData: TeamMemberForm;
}) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function addUserToProject({
    projectId,
    _id,
}: {
    projectId: Project['_id'];
    _id: TeamMember['_id'];
}) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api.post(url, { _id });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

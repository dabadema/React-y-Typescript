import { isAxiosError } from 'axios';
import { NoteFormData } from '../types';
import api from '@/lib/axios';

type NoteAPIType = {
    formData: NoteFormData;
    projectId: ['_id'];
    taskId: ['_id'];
};

export async function createNote({
    projectId,
    taskId,
    formData,
}: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

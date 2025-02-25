import { isAxiosError } from 'axios';
import {
    dashboardProjectSchema,
    editProjectSchema,
    Project,
    ProjectFormData,
    projectSchema,
} from '../types';
import api from '@/lib/axios';

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjects() {
    try {
        const { data } = await api.get('/projects');

        const response = dashboardProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectById(projectId: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${projectId}`);
        const response = editProjectSchema.safeParse(data);
        if (response.success) {
            return response;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getFullProjectDetailsById(projectId: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${projectId}`);
        const response = projectSchema.safeParse(data);
        if (response.success) {
            return response;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData;
    projectId: Project['_id'];
};

export async function updateProject({ formData, projectId }: ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

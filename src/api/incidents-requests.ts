import { api } from '~/api/config'

import type {
	ApiResponse,
	CreateIncidentsBody,
	GetIncidentResponse,
	GetIncidentsResponse,
	IncidentBaseResponse,
} from '~/@types'

export async function getIncidents(page = 1) {
	const queryParams = new URLSearchParams({
		page: String(page),
	})

	const response = await api.get<ApiResponse<GetIncidentsResponse>>(`/incidents?${queryParams}`)
	return response
}

export async function getIncidentById(id: string) {
	const response = await api.get<ApiResponse<GetIncidentResponse>>(`/incidents/${id}`)
	return response
}

export async function createIncident(data: CreateIncidentsBody) {
	const formData = new FormData()

	formData.append('title', data.title)
	formData.append('description', data.description)
	formData.append('department_name', data.department_name)
	formData.append('category_name', data.category_name)
	if (data.avatar && data.avatar[0] instanceof File) {
		for (let i = 0; i < data.avatar.length; i++) {
			formData.append('avatar', data.avatar[i])
		}
	}

	const response = await api.post<ApiResponse<IncidentBaseResponse>>('/incidents', formData)
	return response
}

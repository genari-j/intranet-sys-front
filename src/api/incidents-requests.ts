import { api } from '~/api/config'

import type {
	ApiResponse,
	CreateIncidentsBody,
	GetIncidentResponse,
	GetIncidentsResponse,
	IncidentBaseResponse,
} from '~/@types'

type IncidentsParams = {
	page?: number
	limit?: number
	code?: string
	status_id?: string
	priority_id?: string
	assigned_id?: string
	created_at?: Date
}

export async function getIncidents(params: IncidentsParams = {}) {
	const queryParams = new URLSearchParams()

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null) continue
		queryParams.append(key, value instanceof Date ? value.toISOString() : String(value))
	}

	const response = await api.get<ApiResponse<GetIncidentsResponse>>(`/incidents?${queryParams.toString()}`)
	return response.data
}

export async function getIncidentById(id: string) {
	const response = await api.get<ApiResponse<GetIncidentResponse>>(`/incidents/${id}`)
	return response.data
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

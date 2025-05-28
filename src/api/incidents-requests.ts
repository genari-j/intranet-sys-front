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

export async function getIncidents(params: IncidentsParams) {
	const queryParams = new URLSearchParams()

	if (params.page) queryParams.append('page', String(params.page))
	if (params.limit) queryParams.append('limit', String(params.limit))
	if (params.code !== undefined) queryParams.append('code', String(params.code))
	if (params.status_id !== undefined) queryParams.append('status_id', String(params.status_id))
	if (params.priority_id !== undefined) queryParams.append('priority_id', String(params.priority_id))
	if (params.assigned_id !== undefined) queryParams.append('assigned_id', String(params.assigned_id))
	if (params.created_at !== undefined) queryParams.append('created_at', String(params.created_at))

	const response = await api.get<ApiResponse<GetIncidentsResponse>>(`/incidents?${queryParams.toString()}`)
	return response.data
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

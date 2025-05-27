import { api } from '~/api/config'

import type { ApiResponse, GetPointsResponse, CreateOrUpdatePointBody } from '~/@types'

export async function getPoints(page = 1) {
	const queryParams = new URLSearchParams({
		page: String(page),
	})

	const response = await api.get<ApiResponse<GetPointsResponse>>(`/human-resources-points?${queryParams}`)
	return response.data
}

export async function createPoint(data: CreateOrUpdatePointBody) {
	const response = await api.post('/human-resources-points', data)
	return response
}

import { api } from '~/api/config'

import type { ApiResponse, GetNotificationsResponse } from '~/@types'

type NotificationParams = {
	page?: number
	read?: boolean
	limit?: number
}

export async function getNotifications(params: NotificationParams = {}) {
	const queryParams = new URLSearchParams()

	if (params.page) queryParams.append('page', String(params.page))
	if (params.limit) queryParams.append('limit', String(params.limit))
	if (params.read !== undefined) queryParams.append('read', String(params.read))

	const response = await api.get<ApiResponse<GetNotificationsResponse>>(`/notifications?${queryParams.toString()}`)
	return response.data
}

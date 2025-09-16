import { api } from '~/api/config'

import type { ApiResponse, GetNotificationsResponse } from '~/@types'

type NotificationParams = {
	page?: number
	read?: boolean
	limit?: number
}

export async function getNotifications(params: NotificationParams = {}) {
	const queryParams = new URLSearchParams()

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null) continue
		queryParams.append(key, String(value))
	}

	const response = await api.get<ApiResponse<GetNotificationsResponse>>(`/notifications?${queryParams.toString()}`)
	return response.data
}

export type Notification = {
	id: string
	title: string
	description: string
	read: boolean
	user: {
		id: string
		name: string
	}
	active: boolean
	created_at: Date
	updated_at: Date
}

export interface GetNotificationsResponse {
	data: Notification[]
	pagination: {
		limit: number
		currentPage: number
		pages: number
		total: number
	}
}

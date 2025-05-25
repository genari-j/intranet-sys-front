export interface BasePoints {
	id: string
	entry: Date
	lunch_out: Date | null
	lunch_return: Date | null
	departure: Date | null
	created_at: Date
	updated_at: Date
}

export interface Points {
	id: string
	entry: Date
	lunch_out: Date | null
	lunch_return: Date | null
	departure: Date | null
	user: {
		user_id: string
		name: string
	}
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export interface GetPointsResponse {
	data: Points[]
	pagination: {
		limit: number
		currentPage: number
		pages: number
		total: number
	}
}

export type CreateOrUpdatePointBody = {
	date: Date
}

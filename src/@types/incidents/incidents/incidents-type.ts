export interface IncidentBaseResponse {
	id: string
	code: number
	title: string
	description: string
	department_id: string
	active: boolean
	deadline: Date | null
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export interface Incident {
	id: string
	code: number
	active: boolean
	deadline: Date | null
	title: string
	description: string
	register: { id: string; name: string }
	category: { id: string; name: string }
	priority: { id: string; name: string }
	department: { id: string; name: string }
	assigned: { id: string; name: string }
	status: { id: string; name: string }
	avatars: {
		id: string
		avatar: string
	}[]
	logs: {
		id: string
		title: string
		description: string
	}[]
	created_at: Date
	updated_at: Date
}

export type CreateIncidentsBody = {
	title: string
	description: string
	department_name: string
	category_name: string
	avatar?: File[]
}

export interface GetIncidentsResponse {
	data: Incident[]
	pagination: {
		limit: number
		currentPage: number
		pages: number
		total: number
	}
}

export interface GetIncidentResponse {
	payload: Incident
}

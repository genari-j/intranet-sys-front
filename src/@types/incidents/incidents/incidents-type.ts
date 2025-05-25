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
	title: string
	description: string
	department: {
		id: string
		name: string
	}
	priority: {
		id: string
		name: string
	}
	status: {
		id: number
		name: string
	}
	category: {
		id: string
		name: string
	}
	assigned?: {
		id: string
		name: string
	}
	deadline?: Date | null
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateIncidentsBody = {
	title: string
	description: string
	department_name: string
	category_name: string
	avatar?: File[]
}

export interface GetIncidentsResponse {
	payload: Incident[]
	error: boolean
	limit: number
	currentPage: number
	pages: number
	total: number
}

export interface GetIncidentResponse {
	payload: Incident
}

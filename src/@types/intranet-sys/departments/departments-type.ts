export interface GetDepartmentResponse {
	id: string
	name: string
	active: boolean
	incidentCategories: {
		id: string
		name: string
		description: string
	}[]
	created_at: Date
}

export interface GetDepartmentsResponse {
	id: string
	name: string
	active: boolean
	incidentCategories: {
		id: string
		name: string
		description: string
	}[]
	created_at: Date
}

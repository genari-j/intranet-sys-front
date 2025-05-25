export interface ApiResponse<T = unknown> {
	success: boolean
	body: {
		message?: string
		payload?: T
	}
}

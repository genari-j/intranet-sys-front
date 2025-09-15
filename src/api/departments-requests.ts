import { api } from '~/api/config'

import type { ApiResponse, GetDepartmentsResponse } from '~/@types'

export async function getDepartments() {
	const response = await api.get<ApiResponse<GetDepartmentsResponse[]>>('/departments')
	return response.data
}

import { api } from '~/api/config'

import type { ApiResponse, SignInFormBody, SignInResponse, GetUserResponse } from '~/@types'

export async function signIn(data: SignInFormBody) {
	const response = await api.post<ApiResponse<SignInResponse>>('/signin', data)
	return response.data
}

export async function getUserById(id: string) {
	const response = await api.get<ApiResponse<GetUserResponse>>(`/users/${id}`)
	return response.data
}

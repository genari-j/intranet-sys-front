import { api } from '~/api/config'

import type {
	ApiResponse,
	GetNewsResponse,
	GetNewResponse,
	NewsBaseResponse,
	CreateNewsBody,
	UpdateNewsBody,
	GetNewsFlagsResponse,
} from '~/@types'

export async function getNews() {
	const response = await api.get<ApiResponse<GetNewsResponse>>('/news')
	return response.data
}

export async function getNewById(id: string) {
	const response = await api.get<ApiResponse<GetNewResponse>>(`/news/${id}`)
	return response.data
}

export async function createNew(data: CreateNewsBody) {
	const formData = new FormData()

	formData.append('title', data.title)
	formData.append('description', data.description)
	formData.append('flag_name', data.flag_name)
	if (data.avatar && data.avatar[0] instanceof File) formData.append('avatar', data.avatar[0])

	const response = await api.post<ApiResponse<NewsBaseResponse>>('/news', formData)
	return response.data
}

export async function updateNew({
	id,
	data,
}: {
	id: string
	data: UpdateNewsBody
}) {
	const formData = new FormData()

	formData.append('title', data.title)
	formData.append('description', data.description)
	formData.append('flag_name', data.flag_name)
	if (data.avatar && data.avatar[0] instanceof File) formData.append('avatar', data.avatar[0])

	const response = await api.put<ApiResponse<NewsBaseResponse>>(`/news/${id}`, formData)
	return response.data
}

export async function getNewsFlags() {
	const response = await api.get<ApiResponse<GetNewsFlagsResponse>>('/news-flags')
	return response.data
}

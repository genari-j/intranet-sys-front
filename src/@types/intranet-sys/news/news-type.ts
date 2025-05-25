type BaseEntity = {
	id: string
	created_at: Date
	updated_at: Date
}

type WithOptionalAvatar = {
	avatar: string | null
}

export type NewsFlag = {
	id: string
	name: string
	description: string
}

export type NewsBaseResponse = BaseEntity &
	WithOptionalAvatar & {
		title: string
		description: string
		flag_id: string
		active: boolean
		deleted_at: Date | null
	}

export type BaseCategorizedNews = BaseEntity &
	WithOptionalAvatar & {
		title: string
		description: string
		active: boolean
		flag: NewsFlag
	}

export interface GetNewsResponse {
	hero: BaseCategorizedNews[]
	medium: BaseCategorizedNews[]
	simple: BaseCategorizedNews[]
}

export type GetNewResponse = BaseCategorizedNews

type NewsFormBody = {
	title: string
	description: string
	flag_name: string
	avatar?: FileList
}

export type CreateNewsBody = NewsFormBody
export type UpdateNewsBody = NewsFormBody

export type BaseNewsFlags = BaseEntity & {
	name: string
	description: string
	active: boolean
}

export type GetNewsFlagsResponse = BaseNewsFlags[]

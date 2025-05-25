export interface User {
	id: string
	name: string
	registration: string
	email: string
	contact: string
	address: {
		id: string
		street: string
		number: number
		neighborhood: string
		city: string
		state: string
		cep: string
		complement: string | null
		active: boolean
	}
	department: {
		id: string
		name: string
		active: boolean
	}
	profile: {
		id: string
		name: string
		code: string
		description: string
		active: boolean
		permissions: {
			id: string
			permission: string
			description: string
			active: boolean
		}[]
	}
	active: boolean
	avatar: string | null
	created_at: Date
	updated_at: Date
}

export type GetUserResponse = User

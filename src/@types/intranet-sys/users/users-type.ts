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
	permissions: {
		id: string
		name: string
		description: string
	}[]
	active: boolean
	avatar: string | null
	created_at: Date
	updated_at: Date
}

export type GetUserResponse = User

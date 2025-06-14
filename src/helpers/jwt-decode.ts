import { jwtDecode } from 'jwt-decode'

interface User {
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
		complement: string
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
	exp: number
	iat: number
	created_at: Date
	updated_at: Date
}

export const decodeAccessToken = (token: string): User | undefined => {
	const checkingLogin = localStorage.getItem('@IntranetSys:token')

	try {
		if (checkingLogin) return jwtDecode(token)
	} catch (error) {
		console.log(`Algo inesperado ocorreu com a autenticação. ${error}`)
	}
}

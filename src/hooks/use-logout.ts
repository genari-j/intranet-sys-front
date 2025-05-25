import { useNavigate } from 'react-router-dom'
import { config } from '~/helpers'

export const useLogout = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem(config.LOCAL_STORAGE_TOKEN)
		navigate('/')
	}

	return {
		handleLogout,
	}
}

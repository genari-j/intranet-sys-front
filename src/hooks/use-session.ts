import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { api } from '~/api/config'
import { config, decodeAccessToken } from '~/helpers'

export const useSession = () => {
	const navigate = useNavigate()

	const isSignedIn = (): boolean => {
		const userToken = JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_TOKEN) as string)
		if (!userToken) return false

		api.defaults.headers.common.Authorization = `Bearer ${userToken}`

		if (userToken) {
			const decodedToken = decodeAccessToken(userToken)

			if (decodedToken) {
				const tokenExpirationTime = decodedToken.exp * 1000
				const tokenExpired = tokenExpirationTime < Date.now()

				if (tokenExpired) {
					localStorage.removeItem(config.LOCAL_STORAGE_TOKEN)
					toast.error('Acesso expirado. Por gentileza, efetue Login novamente.')
					navigate('/')
					return false
				}
			}
		}

		return true
	}

	const userToken = JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_TOKEN) as string)
	const userInfos = decodeAccessToken(userToken)

	return {
		isSignedIn,
		userInfos,
	}
}

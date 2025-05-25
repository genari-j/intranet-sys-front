import { useState } from 'react'

export const useGeneralStates = () => {
	const [passwordState, setPasswordState] = useState(false)
	const handleShowPassword = () => setPasswordState((prevState) => !prevState)

	return {
		passwordState,
		handleShowPassword,
	}
}

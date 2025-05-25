import type { Dispatch, SetStateAction } from 'react'

export const handleFocus = (setState: Dispatch<SetStateAction<boolean>>) => setState(true)
export const handleBlur = (setState: Dispatch<SetStateAction<boolean>>) => {
	setTimeout(() => {
		setState(false)
	}, 100)
}

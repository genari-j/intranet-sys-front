import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type FormHelperProps = ComponentProps<'span'>

export const FormHelper = ({ className, ...props }: FormHelperProps) => {
	const combinedClassName = twMerge('block text-center text-sm font-medium text-red9', className)

	return <span className={combinedClassName} {...props} />
}

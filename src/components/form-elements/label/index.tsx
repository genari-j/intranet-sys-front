import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type LabelProps = ComponentProps<'label'>

export const Label = ({ className, ...props }: LabelProps) => {
	const combinedClassName = twMerge('font-medium mb-[2px] block', className)

	return <label className={combinedClassName} {...props} />
}

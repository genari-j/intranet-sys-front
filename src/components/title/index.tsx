import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TitleProps = ComponentProps<'h2'> & {
	title: string
}

export const Title = ({ title, className, ...props }: TitleProps) => {
	const combinedClassName = twMerge('text-center text-[1.6rem] font-medium', className)

	return (
		<h2 className={combinedClassName} {...props}>
			{title}
		</h2>
	)
}

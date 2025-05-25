import type { ComponentProps, JSX } from 'react'
import { twMerge } from 'tailwind-merge'

interface CustomButtonProps extends ComponentProps<'button'> {
	description: string | JSX.Element
}

export const Button = ({ className, description, ...props }: CustomButtonProps) => {
	const combinedClassName = twMerge(
		'flex justify-center items-center gap-[2px] cursor-pointer font-medium whitespace-nowrap text-white9 bg-black9 py-1 px-8 rounded hover:brightness-150 duration-150',
		className,
	)
	return (
		<button type="button" className={combinedClassName} {...props}>
			{description}
		</button>
	)
}

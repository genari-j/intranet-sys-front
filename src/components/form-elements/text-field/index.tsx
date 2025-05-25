import type { ReactNode, ComponentProps } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { twMerge } from 'tailwind-merge'

import { Label, FormHelper } from '~/components'

interface TextFieldProps extends ComponentProps<'input'> {
	register?: UseFormRegisterReturn
	label?: string | ReactNode
	htmlFor?: string
	error?: boolean
	message?: string
	children?: ReactNode
}

export const Textfield = ({
	register,
	htmlFor,
	label,
	error,
	children,
	message,
	className,
	...props
}: TextFieldProps) => {
	const combinedClassName = twMerge(
		`w-full duration-150 text-base py-2 px-4 rounded border-2 border-gray8 bg-gray7
		placeholder:text-gray9 hover:border-gray8 focus:border-black9
		${error && error === true ? 'border-red9' : 'border-transparent'}
		${children ? 'py-2 pr-[41px] pl-4' : 'py-2 px-4'}`,
		className,
	)

	return (
		<div className="w-full">
			<Label htmlFor={htmlFor}>{label}</Label>
			<div className="w-full flex items-center relative rounded bg-gray6">
				<input
					name={register?.name}
					ref={register?.ref}
					onChange={register?.onChange}
					className={combinedClassName}
					{...(error && { error: 'true' })}
					{...props}
				/>
				{children && <i className="flex absolute right-2 text-2xl px-1 bg-transparent">{children}</i>}
			</div>
			<FormHelper>{message}</FormHelper>
		</div>
	)
}

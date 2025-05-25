import type { ComponentProps } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { twMerge } from 'tailwind-merge'

import { Label, FormHelper } from '~/components'

interface TextareaProps extends ComponentProps<'textarea'> {
	register?: UseFormRegisterReturn
	htmlFor?: string
	label?: string
	error?: boolean
	message?: string
}

export const Textarea = ({ register, htmlFor, label, error, message, className, ...props }: TextareaProps) => {
	const combinedClassName = twMerge(
		`w-full duration-150 text-base py-2 px-4 rounded border-2 border-gray8 bg-gray7
		placeholder:text-gray9 resize-none hover:border-gray8 focus:border-black9
		${error && error === true ? 'border-red9' : 'border-transparent'}`,
		className,
	)

	return (
		<div className="w-full">
			<Label htmlFor={htmlFor}>{label}</Label>
			<textarea
				name={register?.name}
				ref={register?.ref}
				onChange={register?.onChange}
				className={combinedClassName}
				{...(error && { error: 'true' })}
				{...props}
			/>
			<FormHelper>{message}</FormHelper>
		</div>
	)
}

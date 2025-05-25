import type { ComponentProps } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { twMerge } from 'tailwind-merge'

import { Label, FormHelper } from '~/components'

interface SelectProps extends ComponentProps<'select'> {
	register?: UseFormRegisterReturn
	label?: string
	htmlFor?: string
	error?: boolean
	defaults?: { id: number; name: string }
	data: Array<{ id: number | string; name: string }>
	message?: string | undefined
}

export const Select = ({
	register,
	label,
	htmlFor,
	error,
	defaults,
	data,
	message,
	className,
	...props
}: SelectProps) => {
	const combinedClassName = twMerge(
		`w-full duration-150 text-base py-2 px-4 rounded border-2 border-gray8 bg-gray7
		placeholder:text-gray9 hover:border-gray8 focus:border-black9
		${error && error === true ? 'border-red9' : 'border-transparent'}`,
		className,
	)

	return (
		<div className="w-full">
			<Label htmlFor={htmlFor}>{label}</Label>
			<select
				name={register?.name}
				ref={register?.ref}
				onChange={register?.onChange}
				className={combinedClassName}
				{...(error && { error: 'true' })}
				{...props}
			>
				<option value={defaults ? defaults.id : 0} hidden>
					{defaults ? defaults.name : 'Selecione uma opção'}
				</option>
				{data.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
			<FormHelper>{message}</FormHelper>
		</div>
	)
}

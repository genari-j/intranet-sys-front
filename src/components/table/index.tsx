import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TableProps = ComponentProps<'table'>
type THeadProps = ComponentProps<'thead'>
type TRProps = ComponentProps<'tr'>
type THProps = ComponentProps<'th'>
type TBodyProps = ComponentProps<'tbody'>
type TDProps = ComponentProps<'td'>

export const Container = ({ ...props }: TableProps) => {
	return (
		<div className="w-full h-[461.8px]">
			<table className="w-full overflow-hidden border-collapse rounded-lg shadow-md" {...props} />
		</div>
	)
}

export const THead = ({ className, ...props }: THeadProps) => {
	const combinedClassName = twMerge('w-full bg-black9 text-white9', className)
	return <thead className={combinedClassName} {...props} />
}

export const TR = ({ className, ...props }: TRProps) => {
	const combinedClassName = twMerge('duration-150 even:bg-gray7', className)
	return <tr className={combinedClassName} {...props} />
}

export const TH = ({ className, ...props }: THProps) => {
	const combinedClassName = twMerge('font-medium uppercase py-3 px-4', className)
	return <th className={combinedClassName} {...props} />
}

export const TBody = ({ className, ...props }: TBodyProps) => {
	const combinedClassName = twMerge('w-full', className)
	return <tbody className={combinedClassName} {...props} />
}

export const TD = ({ className, ...props }: TDProps) => {
	const combinedClassName = twMerge('py-3 px-4', className)
	return <td className={combinedClassName} {...props} />
}

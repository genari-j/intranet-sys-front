import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink({ className, ...props }: NavLinkProps) {
	const { pathname } = useLocation()

	const combinedClassName = twMerge(
		'flex items-center gap-1.5 font-medium transition-colors hover:text-gray9 data-[current=true]:text-red9',
		className,
	)

	return <Link data-current={pathname === props.to} className={combinedClassName} {...props} />
}

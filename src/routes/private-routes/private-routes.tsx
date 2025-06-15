import type { FC } from 'react'
import { Navigate, Outlet, type RouteProps } from 'react-router-dom'
import { useSession } from '~/hooks'

interface RouteWithPermissionProps {
	permission: string
	element: React.ReactElement
}

export const PrivateRoutes: FC<RouteProps> = () => {
	const { isSignedIn } = useSession()
	return isSignedIn() ? <Outlet /> : <Navigate replace to="/" />
}

export const RouteWithPermission = ({ permission, element }: RouteWithPermissionProps) => {
	const { userInfos } = useSession()

	const userPermissions = userInfos?.permissions.map((p) => p.name) || []

	const hasPermission = userPermissions.includes(permission)

	if (!hasPermission) return <Navigate to="/" replace />

	return element
}

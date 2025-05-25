import type { FC } from 'react'
import { Navigate, Outlet, type RouteProps } from 'react-router-dom'
import { useSession } from '~/hooks'
import { roles } from '~/helpers'

interface PrivateRouteWithPermissionsProps {
	requiredPermissions: string[]
	requiredRole?: keyof typeof roles
}

export const PrivateRoutes: FC<RouteProps> = () => {
	const { isSignedIn } = useSession()
	return isSignedIn() ? <Outlet /> : <Navigate replace to="/" />
}

export const PrivateRouteWithPermissions: FC<PrivateRouteWithPermissionsProps> = ({
	requiredPermissions,
	requiredRole,
}) => {
	const { isSignedIn, userInfos } = useSession()

	if (!isSignedIn()) return <Navigate replace to="/" />

	const userPermissions = userInfos?.profile.permissions.map((perm) => perm.permission) || []

	const checkPermissions = (userPermissions: string[], requiredPermissions: string[]) => {
		return requiredPermissions.every((permission) => userPermissions.includes(permission))
	}

	if (requiredRole) {
		if (!checkPermissions(userPermissions, roles[requiredRole])) return <Navigate replace to="/" />
	}

	if (requiredPermissions.length > 0 && !checkPermissions(userPermissions, requiredPermissions))
		return <Navigate replace to="/" />

	return <Outlet />
}

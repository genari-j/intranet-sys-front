import { useSession } from '~/hooks'
import { adminRoutes, managerRoutes, funRoutes } from '~/helpers'

export const usePermissions = () => {
	const { userInfos } = useSession()

	const hasAllPermissionsFromList = (permissionNames: string[]): boolean => {
		if (!userInfos || !userInfos.profile || !userInfos.profile.permissions) return false
		return permissionNames.every((permissionName) =>
			userInfos.profile.permissions.some((perm) => perm.permission === permissionName && perm.active),
		)
	}
	const admScreens = hasAllPermissionsFromList(adminRoutes)
	const manScreens = hasAllPermissionsFromList(managerRoutes)
	const funScreens = hasAllPermissionsFromList(funRoutes)

	const hasPermission = (permissionName: string): boolean => {
		if (!userInfos?.profile?.permissions) return false
		return userInfos.profile.permissions.some((perm) => perm.permission === permissionName && perm.active)
	}

	const allowedRegisterNews = hasPermission('Register News')
	const allowedManagementNews = hasPermission('Edit News')

	return { admScreens, manScreens, funScreens, allowedRegisterNews, allowedManagementNews }
}

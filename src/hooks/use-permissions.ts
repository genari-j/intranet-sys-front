import { useSession } from '~/hooks'

export const usePermissions = () => {
	const { userInfos } = useSession()

	const hasPermission = (permissionName: string): boolean => {
		if (!userInfos?.permissions) return false
		return userInfos.permissions.some((perm) => perm.name === permissionName)
	}

	const allowedDashboards = hasPermission('Dashboards')
	const allowedRegisterNews = hasPermission('Cadastrar notícias')
	const allowedManagementNews = hasPermission('Editar notícias')

	return { allowedDashboards, allowedRegisterNews, allowedManagementNews }
}

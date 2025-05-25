import { createBrowserRouter } from 'react-router-dom'
import { adminRoutes, managerRoutes } from '~/helpers'

import { PrivateRoutes, PrivateRouteWithPermissions } from '~/routes'
import { AppLayout } from '~/templates'

import * as Pages from '~/pages'

export const router = createBrowserRouter([
	{
		errorElement: <Pages.NotFound />,
		element: <AppLayout />,
		children: [
			{
				children: [
					{ path: '/entrar', element: <Pages.SignIn /> },
					{ path: '/', element: <Pages.News /> },
					{ path: '/sistemas/noticias/:id', element: <Pages.NewsManagement /> },
				],
			},
			{
				element: <PrivateRoutes />,
				children: [
					{
						children: [
							{ path: '/sistemas', element: <Pages.Systems /> },
							{ path: '/sistemas/registro-de-ponto', element: <Pages.Points /> },
							{ path: '/usuarios/:id/perfil', element: <Pages.Profile /> },
							{ path: '/sistemas/chamados', element: <Pages.Incidents /> },
							{ path: '/sistemas/chamados/cadastrar', element: <Pages.IncidentsCreate /> },
							{ path: '/notificacoes', element: <Pages.Notifications /> },
						],
					},
					{
						element: <PrivateRouteWithPermissions requiredPermissions={managerRoutes} requiredRole="manager" />,
						children: [
							{ path: '/FAQ', element: <Pages.FAQ /> },
							{ path: '/sistemas/noticias/cadastrar', element: <Pages.NewsCreate /> },
						],
					},
					{
						element: <PrivateRouteWithPermissions requiredPermissions={adminRoutes} requiredRole="admin" />,
						children: [{ path: '/dashboard', element: <Pages.Dashboard /> }],
					},
				],
			},
		],
	},
])

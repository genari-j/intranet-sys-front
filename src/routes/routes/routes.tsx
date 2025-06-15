import { createBrowserRouter } from 'react-router-dom'

import { PrivateRoutes, RouteWithPermission } from '~/routes'
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
					{ path: '/FAQ', element: <Pages.FAQ /> },
				],
			},
			{
				element: <PrivateRoutes />,
				children: [
					{
						children: [
							{ path: '/usuarios/:id/perfil', element: <Pages.Profile /> },
							{ path: '/sistemas', element: <Pages.Systems /> },
							{ path: '/notificacoes', element: <Pages.Notifications /> },
							{
								path: '/sistemas/registro-de-ponto',
								element: <RouteWithPermission permission="Registrar ponto" element={<Pages.Points />} />,
							},
							{
								path: '/sistemas/chamados/cadastrar',
								element: <RouteWithPermission permission="Registrar chamados" element={<Pages.IncidentsCreate />} />,
							},
							{
								path: '/sistemas/chamados',
								element: (
									<RouteWithPermission permission="Visualizar chamados específicos" element={<Pages.Incidents />} />
								),
							},
							{ path: '/sistemas/chamados/:id', element: <Pages.IncidentManagement /> },
							{
								path: '/sistemas/noticias/cadastrar',
								element: <RouteWithPermission permission="Cadastrar notícias" element={<Pages.NewsCreate />} />,
							},
							{
								path: '/dashboard',
								element: <RouteWithPermission permission="Dashboards" element={<Pages.Dashboard />} />,
							},
							{
								path: '/sistemas/visitas',
								element: <RouteWithPermission permission="Visualizar visitas" element={<Pages.Visits />} />,
							},
							{
								path: '/sistemas/portaria',
								element: <RouteWithPermission permission="Visualizar visitas" element={<Pages.Visits />} />,
							},
							{
								path: '/sistemas/estoque',
								element: <RouteWithPermission permission="Visualizar itens" element={<Pages.Stock />} />,
							},
							{
								path: '/sistemas/ecommerce',
								element: <RouteWithPermission permission="Visualizar visitas" element={<Pages.Products />} />,
							},
							{
								path: '/sistemas/documentos',
								element: <RouteWithPermission permission="Visualizar visitas" element={<Pages.Documents />} />,
							},
							{
								path: '/sistemas/compras',
								element: <RouteWithPermission permission="Visualizar visitas" element={<Pages.Purchases />} />,
							},
						],
					},
				],
			},
		],
	},
])

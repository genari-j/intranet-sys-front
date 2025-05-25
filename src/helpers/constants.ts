import { Newspaper, NotebookTabs, ShoppingBasket, Tickets, Building2, Boxes, FileText } from '~/assets'

// LOGIN METHOD
export const config = {
	LOCAL_STORAGE_TOKEN: '@IntranetSys:token',
}

// USER PERMISSIONS
export const adminRoutes = ['FAQ', 'Dashboard', 'Register News', 'Edit News']
export const managerRoutes = ['FAQ', 'Register News']
export const funRoutes = ['Systems']

export const roles = {
	admin: ['FAQ', 'Dashboard', 'Register News', 'Edit News'],
	manager: ['FAQ', 'Register News'],
	user: ['Systems'],
}

// POINTS TABLE
export const pointsTable = ['Data:', 'Entrada:', 'Almoço:', 'Retorno:', 'Saída:']

// POINTS REGISTER
export const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
]

// CHECK POINTS STEP
export const stepLabels: Record<string, string> = {
	entry: 'Registrar entrada',
	lunch_out: 'Registrar almoço',
	lunch_return: 'Registrar retorno',
	departure: 'Registrar saída',
	done: 'Dia finalizado',
}

// CHECK POINTS ICONS
export const stepIcons = ['entry', 'lunch_out', 'lunch_return', 'departure', 'done'] as const

// EXPLAIN NEWS REGISTER
export const newsRegister = [
	{
		id: 1,
		title: 'Principal',
		description: 'Exibe apenas uma única notícia — a mais recente — posicionada no topo da página, em destaque.',
	},
	{
		id: 2,
		title: 'Mediana',
		description: 'Exibe várias notícias, localizadas no meio da página, logo abaixo da sessão principal.',
	},
	{
		id: 3,
		title: 'Simples',
		description: 'Também exibe várias notícias, mas fica abaixo da sessão Mediana, com um destaque menor.',
	},
]

// SYSTEMS SCREEN URLs
export const systemsURLs = [
	{ id: 1, image: Newspaper, name: 'Notícias', link: '/' },
	{ id: 2, image: NotebookTabs, name: 'Registro de Ponto', link: '/sistemas/registro-de-ponto' },
	{ id: 3, image: ShoppingBasket, name: 'E-commerce', link: '/sistemas/ecommerce' },
	{ id: 4, image: Tickets, name: 'Chamados', link: '/sistemas/chamados' },
	{ id: 5, image: Building2, name: 'Portaria', link: '/sistemas/portaria' },
	{ id: 6, image: ShoppingBasket, name: 'Compras', link: '/sistemas/compras' },
	{ id: 7, image: Boxes, name: 'Estoque', link: '/sistemas/estoque' },
	{ id: 8, image: FileText, name: 'Documentos', link: '/sistemas/documentos' },
]

// Incidents Table
export const incidentsTbTitle = ['Código:', 'Resumo:', 'Status:', 'Prioridade:', 'Responsável:', 'Criação:']

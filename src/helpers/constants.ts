import {
	Newspaper,
	NotebookTabs,
	ShoppingBasket,
	ShoppingCart,
	Tickets,
	Building2,
	Boxes,
	FileText,
	UserCog,
} from '~/assets'

// LOGIN METHOD
export const config = {
	LOCAL_STORAGE_TOKEN: '@IntranetSys:token',
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
	{ id: 1, image: Newspaper, name: 'Notícias', link: '/', permission: 'Visualizar notícias' },
	{
		id: 2,
		image: NotebookTabs,
		name: 'Registro Ponto',
		link: '/sistemas/registro-de-ponto',
		permission: 'Visualizar pontos específicos',
	},
	{ id: 3, image: ShoppingCart, name: 'E-commerce', link: '/sistemas/ecommerce', permission: 'Visualizar produtos' },
	{
		id: 4,
		image: Tickets,
		name: 'Chamados',
		link: '/sistemas/chamados',
		permission: 'Visualizar chamados específicos',
	},
	{ id: 5, image: Building2, name: 'Portaria', link: '/sistemas/portaria', permission: 'Visualizar visitas' },
	{
		id: 6,
		image: ShoppingBasket,
		name: 'Compras',
		link: '/sistemas/compras',
		permission: 'Visualizar compras específicas',
	},
	{ id: 7, image: Boxes, name: 'Estoque', link: '/sistemas/estoque', permission: 'Visualizar itens' },
	{
		id: 8,
		image: FileText,
		name: 'Documentos',
		link: '/sistemas/documentos',
		permission: 'Visualizar documentos específicos',
	},
	{
		id: 9,
		image: UserCog,
		name: 'Gerenciar Perfis',
		link: '/sistemas/gerenciamento-de-perfis',
		permission: 'Visualizar gerenciamento de perfis',
	},
]

// Incidents Table
export const incidentsTbTitle = ['Código:', 'Resumo:', 'Status:', 'Prioridade:', 'Responsável:', 'Criação:']

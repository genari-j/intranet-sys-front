import { TableMessageRow } from '~/components'

export const renderError = (cols: number) => (
	<TableMessageRow message="Houve um erro ao carregar os dados 💬" columns={cols} />
)

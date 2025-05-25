import { Table } from '~/components'

export const renderError = (tableColumns: number) => (
	<Table.TR>
		<Table.TD colSpan={tableColumns} className="text-center py-4">
			Houve um erro ao carregar os dados 💬
		</Table.TD>
	</Table.TR>
)

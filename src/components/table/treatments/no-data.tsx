import { Table } from '~/components'

export const renderNoData = (tableColumns: number) => (
	<Table.TR>
		<Table.TD colSpan={tableColumns} className="text-center py-4">
			Sem resultados encontrados 💬
		</Table.TD>
	</Table.TR>
)

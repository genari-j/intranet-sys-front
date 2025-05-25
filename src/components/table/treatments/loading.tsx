import { Table, Spinner } from '~/components'

export const renderPending = (tableColumns: number) => (
	<Table.TR>
		<Table.TD colSpan={tableColumns} className="py-4">
			<Spinner className="w-full" />
		</Table.TD>
	</Table.TR>
)

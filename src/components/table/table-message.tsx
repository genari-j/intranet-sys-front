import { TableElements } from '~/components'

interface TableMessageRowProps {
	message: React.ReactNode
	columns: number
}

export const TableMessageRow = ({ message, columns }: TableMessageRowProps) => (
	<TableElements.TR>
		<TableElements.TD colSpan={columns} className="text-center py-4">
			{message}
		</TableElements.TD>
	</TableElements.TR>
)

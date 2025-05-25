import type { BaseNewsFlags } from '~/@types'

interface SelectedFlag {
	id?: string
	name?: string
}

interface FlagsDropdownProps {
	filteredFlagsList: BaseNewsFlags[] | undefined
	handleSelectedFlag: (flag: SelectedFlag) => void
}

export const FlagsDropdown = ({ filteredFlagsList, handleSelectedFlag }: FlagsDropdownProps) => {
	return (
		<div className="w-full h-[100vh] max-h-[130px] absolute top-[5rem] left-0 z-10 flex flex-col gap-1 overflow-hidden hover:overflow-auto no-scrollbar rounded-md bg-gray7">
			{filteredFlagsList && filteredFlagsList.length > 0 ? (
				filteredFlagsList.map((flag) => (
					<span
						key={flag.id}
						onClick={() => handleSelectedFlag(flag)}
						className="text-sm py-2 px-4 cursor-pointer duration-150 hover:bg-gray8"
					>
						{flag.name}
					</span>
				))
			) : (
				<span className="text-sm py-2 px-4 text-gray-500">Sem resultados na busca 💬</span>
			)}
		</div>
	)
}

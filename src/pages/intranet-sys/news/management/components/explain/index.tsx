interface ExplainNewsProps {
	avatar: string
	title?: string
	newsRegister: {
		id: number
		title: string
		description: string
	}[]
}

export const ExplainNews = ({ avatar, title, newsRegister }: ExplainNewsProps) => {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-[2px]">
				<h3 className="font-medium">Imagem atual:</h3>
				<img src={avatar} alt={title} title={title} className="w-full max-w-[300px] rounded-lg" />
			</div>

			<div className="w-full max-w-[150px] h-[2px] bg-gray8 rounded-lg" />

			<div className="flex flex-col gap-2 mt-[-0.8rem]">
				<h3 className="font-medium">Explicação Sessões:</h3>

				{newsRegister.map((newExplain) => {
					return (
						<div key={newExplain.id}>
							<h3 className="font-medium italic">{newExplain.title}:</h3>
							<p className="text-sm">{newExplain.description}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

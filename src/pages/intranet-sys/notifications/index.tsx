import { pageTitle, formatDate } from '~/helpers'

import { Title } from '~/components'

import { Clock, OctagonAlert } from '~/assets'

export const Notifications = () => {
	pageTitle('Notificações')

	const notifications = [
		{
			id: 'dsfjdsjfsdkf',
			title: 'Abertura de chamado',
			description: 'Um novo chamado "Fazer XYZ" foi criado',
			register_by: {
				id: 'jdgffhjghjrt',
				name: 'Beltrano Tavares',
			},
			created_at: new Date(),
		},
		{
			id: 'dsfjdsjfsdkf',
			title: 'Nova notícia',
			description: 'Uma nova notícia "Falando Sobre Tal" foi criada',
			register_by: {
				id: 'jdgffhjghjrt',
				name: 'Ciclano Souza',
			},
			created_at: new Date(),
		},
		{
			id: 'dsfjdsjfsdkf',
			title: 'Atualização de chamado',
			description: 'O Status do Chamado "Fazer XYZ" mudou para "Em andamento"',
			register_by: {
				id: 'jdgffhjghjrt',
				name: 'Fulano Silva',
			},
			created_at: new Date(),
		},
	]

	return (
		<main className="w-full max-w-[900px] flex flex-col items-center">
			<Title title="Notificações" />

			{notifications && notifications.length > 0 && (
				<div className="w-full flex flex-col gap-4">
					{notifications.map((notification) => {
						return (
							<div key={notification.id} className="w-full flex justify-between shadow-md p-4 rounded-lg">
								<div className="flex flex-col">
									<span className="flex items-center gap-1 font-medium">
										<OctagonAlert size={18} /> {notification.title}
									</span>
									<p>{notification.description}</p>
								</div>
								<time
									title={formatDate(notification.created_at).publishedDateFormatted}
									dateTime={formatDate(notification.created_at).isoString}
									className="flex items-center gap-1"
								>
									<Clock size={18} /> {formatDate(notification.created_at).publishedRelativeToNow}
								</time>
							</div>
						)
					})}
				</div>
			)}
		</main>
	)
}

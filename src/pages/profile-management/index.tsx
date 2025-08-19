import { pageTitle } from '~/helpers'

import { Title } from '~/components'

export const ProfileManagement = () => {
	pageTitle('Gerenciamento de Perfis')

	return (
		<main className="w-full max-w-[900px] flex flex-col gap-6 items-center">
			<Title title="Gerenciamento de Perfis" />

			<div className="w-full flex flex-col gap-2" />
		</main>
	)
}

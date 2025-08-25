import { pageTitle } from '~/helpers'

import { Title } from '~/components'

export const ProfileManagement = () => {
	pageTitle('Gerenciamento de Perfis')

	return (
		<main className="w-full flex justify-center">
			<div className="w-full max-w-[1000px] flex flex-col items-start gap-4 px-4">
				<Title title="Gerenciamento de Perfis" />
			</div>
		</main>
	)
}

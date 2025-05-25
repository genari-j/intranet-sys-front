import { Link } from 'react-router-dom'

import { pageTitle, systemsURLs } from '~/helpers'

import { Title } from '~/components'

export const Systems = () => {
	pageTitle('Sistemas')

	return (
		<main className="w-full max-w-[900px] flex flex-col gap-6 items-center">
			<Title title="Sistemas Internos" />

			<div className="w-full flex flex-wrap justify-center gap-4 rounded-2xl">
				{systemsURLs.map((url) => {
					return (
						<Link
							key={url.id}
							to={url.link}
							className="w-full max-w-[150px] h-[120px] flex flex-col justify-center items-center cursor-pointer text-[15px] font-medium rounded-lg shadow-md bg-gray7 duration-150 hover:bg-gray8"
						>
							<i>{<url.image size={40} />}</i>
							{url.name}
						</Link>
					)
				})}
			</div>
		</main>
	)
}

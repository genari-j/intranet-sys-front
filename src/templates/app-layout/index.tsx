import { Outlet } from 'react-router-dom'

import { Header, Footer } from '~/templates'

export const AppLayout = () => {
	return (
		<div className="w-full h-screen flex flex-col items-center gap-4">
			<Header />
			<div className="w-full max-w-[1200px] flex flex-1 justify-center items-center pt-28">
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}

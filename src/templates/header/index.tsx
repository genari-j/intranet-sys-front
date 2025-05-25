import { useNotification } from '~/contexts'
import { useLogout, usePermissions, useRouting, useSession } from '~/hooks'

import { Button, NavLink } from '~/components'

import { Bell } from '~/assets'

export const Header = () => {
	const { unreadCount } = useNotification()

	const { isSignedIn, userInfos } = useSession()
	const { admScreens, manScreens, funScreens } = usePermissions()

	const { handleLogout } = useLogout()
	const { handleGoToLogin, handleGoToProfile } = useRouting()

	return (
		<header className="w-full flex justify-center fixed z-10 py-4 bg-gray7 shadow-md">
			<div className="w-full max-w-[1200px] flex justify-between items-center">
				<div>LOGO</div>

				<div className="flex items-center gap-20">
					<nav>
						<ul className="flex gap-4">
							<li>
								<NavLink to="/">Início</NavLink>
							</li>
							{funScreens && (
								<li>
									<NavLink to="/sistemas">Sistemas</NavLink>
								</li>
							)}
							{admScreens && (
								<li>
									<NavLink to="/dashboard">Dashboard</NavLink>
								</li>
							)}
							{manScreens && (
								<li>
									<NavLink to="/FAQ">FAQ</NavLink>
								</li>
							)}
						</ul>
					</nav>

					<div className="flex items-center gap-8">
						<div className="flex items-center gap-2">
							{isSignedIn() && userInfos?.name && (
								<>
									<span
										title="Perfil"
										onClick={() => handleGoToProfile(userInfos?.id)}
										className="cursor-pointer hover:text-gray9 duration-150"
									>
										{userInfos?.name.split(' ')[0]}
									</span>

									<NavLink to="/notificacoes">
										<Bell />
										<span>{unreadCount}</span>
									</NavLink>
								</>
							)}
						</div>

						{isSignedIn() && userInfos?.name ? (
							<Button onClick={handleLogout} description="Sair" />
						) : (
							<Button onClick={handleGoToLogin} description="Login" />
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

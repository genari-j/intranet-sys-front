import { Fragment } from 'react/jsx-runtime'
import { useNotification } from '~/contexts'
import { usePermissions, useLogout, useRouting, useSession } from '~/hooks'

import { Button, NavLink } from '~/components'

import { Bell } from '~/assets'

export const Header = () => {
	const { unreadCount } = useNotification()

	const { isSignedIn, userInfos } = useSession()
	const { allowedDashboards } = usePermissions()

	const { handleLogout } = useLogout()
	const { handleGoToLogin } = useRouting()

	return (
		<header className="w-full flex justify-center fixed z-10 py-4 bg-gray7 shadow-md">
			<div className="w-full max-w-[1200px] flex justify-between items-center">
				<div>LOGO</div>

				<div className={`flex items-center ${isSignedIn() ? 'gap-20' : 'gap-5'}`}>
					<nav>
						<ul className="flex gap-4">
							<li>
								<NavLink to="/">Notícias</NavLink>
							</li>
							{isSignedIn() && (
								<Fragment>
									<li>
										<NavLink to="/sistemas">Sistemas</NavLink>
									</li>
									{allowedDashboards && (
										<li>
											<NavLink to="/dashboard">Dashboard</NavLink>
										</li>
									)}
								</Fragment>
							)}
							<li>
								<NavLink to="/FAQ">FAQ</NavLink>
							</li>
						</ul>
					</nav>

					<div className="flex items-center gap-8">
						{isSignedIn() && userInfos?.name && (
							<div className="flex items-center gap-2">
								<NavLink to={`/usuarios/${userInfos?.id}/perfil`}>{userInfos?.name.split(' ')[0]}</NavLink>

								<NavLink to="/notificacoes" className="relative">
									<Bell />
									{unreadCount > 0 && (
										<span className="h-[22px] w-[22px] flex justify-center items-center absolute top-[-0.6rem] right-[-0.6rem] text-[13px] p-1 text-white9 bg-blue8 rounded-full">
											{unreadCount}
										</span>
									)}
								</NavLink>
							</div>
						)}

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

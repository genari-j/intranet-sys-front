import { Fragment } from 'react/jsx-runtime'
import { useNotification } from '~/contexts'
import { usePermissions, useLogout, useRouting, useSession } from '~/hooks'

import { Button, NavLink } from '~/components'

import { Bell, Logo } from '~/assets'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
	const { pathname } = useLocation()
	const isLoginPath = pathname !== '/entrar'

	const { unreadCount } = useNotification()

	const { isSignedIn, userInfos } = useSession()
	const { allowedDashboards } = usePermissions()

	const { handleLogout } = useLogout()
	const { handleGoToLogin } = useRouting()

	return (
		<header className={`w-full flex justify-center fixed z-10 ${isLoginPath ? 'py-2 bg-gray7 shadow-md' : 'pt-10'}`}>
			<div className={`w-full max-w-[1200px] flex ${isLoginPath ? 'justify-between' : 'justify-center'}  items-center`}>
				<Link to="/" className="duration-150 transform hover:scale-105">
					<img
						src={Logo}
						alt="Intranet Sys"
						title="Intranet Sys"
						className={`w-full ${isLoginPath ? 'max-w-[60px]' : 'max-w-[80px]'}  flex`}
					/>
				</Link>

				{isLoginPath && (
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

							<Button
								onClick={isSignedIn() && userInfos?.name ? handleLogout : handleGoToLogin}
								description={`${isSignedIn() && userInfos?.name ? 'Sair' : 'Entrar'}`}
							/>
						</div>
					</div>
				)}
			</div>
		</header>
	)
}

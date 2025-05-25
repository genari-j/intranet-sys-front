import { useNavigate } from 'react-router-dom'

export const useRouting = () => {
	const navigate = useNavigate()

	const handleGoToLogin = () => navigate('/entrar')
	const handleGoToProfile = (id: string) => navigate(`/usuarios/${id}/perfil`)

	const handleGoToEditNews = (id: string) => navigate(`/sistemas/noticias/${id}`)

	const handleGoToIncidentDetail = (id: string) => navigate(`/sistemas/chamados/${id}`)
	const handleGoToIncidentCreate = () => navigate('/sistemas/chamados/cadastrar')

	return {
		handleGoToLogin,
		handleGoToProfile,
		handleGoToEditNews,
		handleGoToIncidentDetail,
		handleGoToIncidentCreate,
	}
}

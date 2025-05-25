export const Footer = () => {
	return (
		<footer className="w-full flex justify-center mt-auto py-8">
			<div className="flex flex-col items-center">
				<span className="font-medium">Intranet Sys, {new Date().getFullYear()}</span>
				<p>Todos os direitos reservados.</p>
			</div>
		</footer>
	)
}

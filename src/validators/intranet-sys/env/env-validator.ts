import { z } from 'zod'

const errorMessage = 'Caracteres não informados 😕'

const envSchema = z.object({
	VITE_API_URL: z.string().url().min(1, errorMessage),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
	console.error('Ops, ocorreu algum erro relacionado a variáveis de ambiente 💬', _env.error.format())
	throw new Error('Variáveis de ambiente inválidas 💬')
}

export const env = _env.data

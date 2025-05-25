import { z } from 'zod'

export const validateSignInSchema = z.object({
	registration: z.string().min(1, 'Matrícula inválida'),
	password: z.string().min(1, 'Senha inválida').min(6, 'A senha deve conter no mínimo 6 caracteres'),
})

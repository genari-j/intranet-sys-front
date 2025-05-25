import { z } from 'zod'

export const validateCreateOrUpdatePointSchema = z.object({
	date: z.date(),
})

import axios from 'axios'
import { env } from '~/validators'

const api = axios.create({
  baseURL: env.VITE_API_URL as string
})

export {
  api
}
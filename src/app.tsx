import './themes/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { client } from '~/api/config'
import { AppProvider } from '~/contexts'
import { Toaster } from 'react-hot-toast'

import { router } from '~/routes'

export function App() {
	return (
		<QueryClientProvider client={client}>
			<Toaster position="bottom-right" />

			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</QueryClientProvider>
	)
}

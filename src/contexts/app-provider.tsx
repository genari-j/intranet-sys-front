import { NotificationProvider, useNotification } from './notifications/notifications-context'

interface AppProviderProps {
	children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => <NotificationProvider>{children}</NotificationProvider>

export { useNotification }

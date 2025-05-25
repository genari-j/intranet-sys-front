import { createContext, useContext, useEffect, useState } from 'react'

import { env } from '~/validators'
import { io, type Socket } from 'socket.io-client'

interface NotificationsProviderProps {
	children: React.ReactNode
}

interface Notification {
	title: string
	description: string
	userId: string
}

interface NotificationContextType {
	notifications: Notification[]
	unreadCount: number
}

const NotificationContext = createContext<NotificationContextType>({
	notifications: [],
	unreadCount: 0,
})

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }: NotificationsProviderProps) => {
	const [notifications, setNotifications] = useState<Notification[]>([])
	const [_socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		const socketInstance = io(env.VITE_API_URL as string)
		setSocket(socketInstance)

		socketInstance.on('notification', (data: Notification) => {
			setNotifications((prev) => [data, ...prev])
		})

		return () => {
			socketInstance.disconnect()
		}
	}, [])

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				unreadCount: notifications.length,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

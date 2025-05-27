import { createContext, useContext, useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { useQuery } from '@tanstack/react-query'

import { getNotifications } from '~/api'
import type { Notification } from '~/@types'
import { env } from '~/validators'

interface NotificationsProviderProps {
	children: React.ReactNode
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
	const { data } = useQuery({
		queryKey: ['notifications'],
		queryFn: () => getNotifications({ page: 1, read: false, limit: 1000 }),
	})

	const [_socket, setSocket] = useState<Socket | null>(null)
	const [realtimeNotifications, setRealtimeNotifications] = useState<Notification[]>([])

	useEffect(() => {
		const socketInstance = io(env.VITE_API_URL as string)
		setSocket(socketInstance)

		socketInstance.on('notification', (data: Notification) => {
			setRealtimeNotifications((prev) => [data, ...prev])
		})

		return () => {
			socketInstance.disconnect()
		}
	}, [])

	const allNotifications = [...(data?.body?.payload?.data ?? []), ...realtimeNotifications]

	return (
		<NotificationContext.Provider
			value={{
				notifications: allNotifications,
				unreadCount: allNotifications.length,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

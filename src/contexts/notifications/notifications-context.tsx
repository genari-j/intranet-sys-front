import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { io, type Socket } from 'socket.io-client'
import { useQuery } from '@tanstack/react-query'

import { getNotifications } from '~/api/notifications-requests'
import type { Notification } from '~/@types'
import { env } from '~/validators'

interface NotificationsProviderProps {
	children: ReactNode
}

interface NotificationContextType {
	notifications: Notification[]
	unreadCount: number
	activateNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType>({
	notifications: [],
	unreadCount: 0,
	activateNotifications: () => {},
})

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }: NotificationsProviderProps) => {
	const [notificationsPage, _setNotificationsPage] = useState(1)
	const [_socket, setSocket] = useState<Socket | null>(null)
	const [realtimeNotifications, setRealtimeNotifications] = useState<Notification[]>([])
	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
		const userToken = localStorage.getItem('@IntranetSys:token')
		if (userToken) setEnabled(true)
	}, [])

	const notificationsParams = {
		page: notificationsPage,
		read: false,
		limit: 9999,
	}

	const { data } = useQuery({
		queryKey: ['notifications', notificationsParams],
		queryFn: () => getNotifications(notificationsParams),
		enabled: enabled,
	})

	useEffect(() => {
		const socketInstance = io(env.VITE_API_URL as string)
		setSocket(socketInstance)

		socketInstance.on('notification', (data: Notification) => {
			setRealtimeNotifications((prev) => {
				if (prev.some((n) => n.id === data.id)) return prev
				return [data, ...prev]
			})
		})

		return () => {
			socketInstance.disconnect()
		}
	}, [])

	const activateNotifications = () => setEnabled(true)

	const allNotifications = [...(data?.body?.payload?.data ?? []), ...realtimeNotifications]

	return (
		<NotificationContext.Provider
			value={{
				notifications: allNotifications,
				unreadCount: allNotifications.length,
				activateNotifications,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

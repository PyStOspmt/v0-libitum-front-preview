import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client"

type EventHandler = (...args: any[]) => void
type EventsMap = Record<string, EventHandler>

type UseSocketProps = {
    namespace: string
    options?: Partial<SocketOptions & ManagerOptions>
}

export function useSocket<ListenerEvents extends EventsMap, EmitEvents extends EventsMap>({
    namespace,
    options = {},
}: UseSocketProps) {
    const socketRef = useRef<Socket<ListenerEvents, EmitEvents> | null>(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socketInstance: Socket<ListenerEvents, EmitEvents> = io(`${process.env.NEXT_PUBLIC_API_URL}/${namespace}`, {
            transports: ["websocket"],
            ...options,
        })

        socketRef.current = socketInstance

        socketInstance.on("connect", () => setIsConnected(true))
        socketInstance.on("disconnect", () => setIsConnected(false))

        return () => {
            socketInstance.disconnect()
            socketRef.current = null
        }
    }, [namespace])

    const emit = useCallback(<E extends keyof EmitEvents>(event: E & string, ...args: Parameters<EmitEvents[E]>) => {
        if (!socketRef.current) return
        socketRef.current.emit<any>(event, ...args)
    }, [])

    return { isConnected, socketRef, emit }
}

type SocketListenerEvent<T extends Socket> =
    T extends Socket<infer ListenerEvents, any> ? keyof ListenerEvents & string : string
type SocketListenerHandler<T extends Socket> =
    T extends Socket<infer ListenerEvents, any> ? ListenerEvents[SocketListenerEvent<T>] : EventHandler

export function useSocketEvent<T extends Socket>(
    socketRef: RefObject<T | null>,
    event: SocketListenerEvent<T>,
    handler: SocketListenerHandler<T>,
) {
    useEffect(() => {
        const socket = socketRef.current
        if (!socket) return

        socket.on<any>(event, handler)

        return () => {
            socket.off<any>(event, handler)
        }
    }, [event, handler, socketRef])
}

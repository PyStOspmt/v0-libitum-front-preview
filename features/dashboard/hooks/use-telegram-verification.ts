import { toast } from "sonner"

import { useSocket, useSocketEvent } from "@/lib/hooks/use-socket"

type ServerToClient = {
    "telegram-verified": (data: { message: string; timestamp: number }) => void
}

type ClientToServer = {}

export function useTelegramVerification() {
    const { isConnected, socketRef } = useSocket<ServerToClient, ClientToServer>({
        namespace: "telegram",
        options: {
            withCredentials: true,
            autoConnect: false,
        },
    })

    useSocketEvent(socketRef, "telegram-verified", ({ message }) => {
        toast.success(message)
    })

    const handleScoketConnection = () => {
        if (!socketRef.current) return
        if (socketRef.current.connected) return
        socketRef.current.connect()
    }

    return {
        isConnected,
        handleScoketConnection,
    }
}

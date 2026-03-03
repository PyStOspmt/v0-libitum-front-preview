import { useMutation } from "@apollo/client/react"
import { useCallback } from "react"
import { toast } from "sonner"

import { useSocket, useSocketEvent } from "@/lib/hooks/use-socket"

import { REQUEST_TELEGRAM_VERIFICATION } from "../graphql/mutations/request-telegram-verification"

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

    const [requestTelegramVerification, { loading }] = useMutation(REQUEST_TELEGRAM_VERIFICATION, {
        onCompleted: ({ requestTelegramVerification }) => {
            window.open(`https://t.me/lbd_465_bot?start=${requestTelegramVerification.token}`, "_blank")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    useSocketEvent(socketRef, "telegram-verified", ({ message }) => {
        toast.success(message)
    })

    const handleRequestVerification = useCallback(async () => {
        if (!socketRef.current) return

        if (!socketRef.current.connected) {
            socketRef.current.connect()
        }

        await requestTelegramVerification()
    }, [requestTelegramVerification])

    return {
        isConnected,
        loading,
        handleRequestVerification,
    }
}

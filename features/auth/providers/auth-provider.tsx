"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { BaseAuthenticatedUser } from "@/types/user"
import { useApolloClient, useMutation } from "@apollo/client/react"
import { JSONCookie } from "cookie-parser"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

import { pagesConfig } from "@/lib/config/pages"
import { useSocket, useSocketEvent } from "@/lib/hooks/use-socket"

import { AuthContext } from "../context/auth-context"
import { LOGIN_WITH_EMAIL_PASSWORD } from "../graphql/mutations/login-with-email-password"
import { LOGOUT_USER } from "../graphql/mutations/logout-user"
import { REGISTER_WITH_EMAIL_PASSWORD } from "../graphql/mutations/register-with-email-password"
import { REQUEST_OAUTH_URL } from "../graphql/mutations/reqeust-oauth-url"
import { GET_CURRENT_USER } from "../graphql/queries/get-current-user"

type AuthProviderProps = {
    children: ReactNode
}

type ServerToClient = {
    "force-logout": (payload: { message: string; timestamp: string }) => void
}

type ClientToServer = {}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<BaseAuthenticatedUser | null>(null)

    const { socketRef } = useSocket<ServerToClient, ClientToServer>({
        namespace: "auth",
        options: {
            autoConnect: false,
        },
    })
    const router = useRouter()
    const apolloClient = useApolloClient()

    const [loginWithEmailAndPassword, { loading: loginWithEmailAndPasswordLoading }] = useMutation(LOGIN_WITH_EMAIL_PASSWORD, {
        onCompleted: ({ user }) => {
            setUser(user)
            router.push(pagesConfig.home)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const [logoutMutation, { loading: logoutLoading }] = useMutation(LOGOUT_USER, {
        onCompleted: () => {
            setUser(null)
            router.push(pagesConfig.login)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const [registerWithEmailAndPasswordMutation, { loading: registerWithEmailAndPasswordLoading }] = useMutation(
        REGISTER_WITH_EMAIL_PASSWORD,
        {
            onCompleted: ({ user }) => {
                setUser(user)
                router.push(pagesConfig.home)
            },
            onError: (error) => {
                toast.error(error.message)
            },
        },
    )

    const [requestOAuthUrlMutation, { loading: requestOAuthUrlLoading }] = useMutation(REQUEST_OAUTH_URL, {
        onCompleted: ({ url }) => {
            window.location.assign(url)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const handleLoginWithEmailAndPassword = useCallback(
        async (email: string, password: string) => {
            await loginWithEmailAndPassword({ variables: { userPayload: { email, password } } })
        },
        [loginWithEmailAndPassword],
    )

    const handleLogout = useCallback(async () => {
        await logoutMutation()
    }, [logoutMutation])

    const handleRegisterWithEmailAndPassword = useCallback(
        async (name: string, email: string, password: string, role: UserRoles) => {
            await registerWithEmailAndPasswordMutation({ variables: { userPayload: { name, email, password, role } } })
        },
        [registerWithEmailAndPasswordMutation],
    )

    const handleOauth = useCallback(
        async (role: UserRoles) => {
            await requestOAuthUrlMutation({ variables: { payload: { role } } })
        },
        [requestOAuthUrlMutation],
    )

    useSocketEvent(socketRef, "force-logout", ({ message }) => {
        setUser(null)
        toast.warning(message)
        router.push(pagesConfig.login)
    })

    useEffect(() => {
        if (!socketRef.current) return

        if (user && !socketRef.current.connected) {
            console.log("conntected")
            socketRef.current.connect()
        }
    }, [user, socketRef])

    useEffect(() => {
        const getCurrentUser = async () => {
            const { data } = await apolloClient.query({
                query: GET_CURRENT_USER,
            })

            if (!data) {
                return
            }

            setUser(data.user)
        }

        getCurrentUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                handleLoginWithEmailAndPassword,
                handleLogout,
                handleRegisterWithEmailAndPassword,
                handleOauth,
                loginWithEmailAndPasswordLoading,
                logoutLoading,
                registerWithEmailAndPasswordLoading,
                requestOAuthUrlLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

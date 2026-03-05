import { useMutation } from "@apollo/client/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { REQUEST_PASSWORD_RESET_MUTATION } from "../graphql/mutations/request-password-reset"
import { RESET_PASSWORD_MUTATION } from "../graphql/mutations/reset-password"

export function useResetPassword() {
    const router = useRouter()

    const [requestResetPassword, { loading: requestResetPasswordLoading, error: requestResetPasswordError }] = useMutation(
        REQUEST_PASSWORD_RESET_MUTATION,
        {
            onCompleted: () => {
                toast.success("Посилання для скидання паролю відправлено")
            },
            onError: ({ message }) => {
                toast.error(message)
            },
        },
    )

    const [confirmResetPassword, { loading: confirmResetPasswordLoading, error: confirmResetPasswordError }] = useMutation(
        RESET_PASSWORD_MUTATION,
        {
            onCompleted: () => {
                toast.success("Пароль успішно змінено")
                router.push("/login")
            },
            onError: ({ message }) => {
                toast.error(message)
            },
        },
    )

    return {
        requestResetPassword,
        requestResetPasswordLoading,
        requestResetPasswordError,
        confirmResetPassword,
        confirmResetPasswordLoading,
        confirmResetPasswordError,
    }
}

import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Cookies from "js-cookie"

export async function getFingerprint() {
    if (typeof window === "undefined") return null

    const cookiesFingerprint = Cookies.get("device-fingerprint")

    if (cookiesFingerprint) return cookiesFingerprint

    try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()

        Cookies.set("device-fingerprint", result.visitorId, { expires: 365, sameSite: "none", secure: true })

        return result.visitorId
    } catch (error) {
        return null
    }
}

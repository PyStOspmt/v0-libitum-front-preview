import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Cookies from "js-cookie"

export async function getFingerprint() {
    if (typeof window === "undefined") return null

    const fp = await FingerprintJS.load()
    const result = await fp.get()

    Cookies.set("device-fingerprint", result.visitorId, { expires: 365, sameSite: "Lax", secure: true })

    return result.visitorId
}

import FingerprintJS from "@fingerprintjs/fingerprintjs"

let fpPromise: ReturnType<typeof FingerprintJS.load> | null = null

function getFpInstance() {
    if (!fpPromise) {
        fpPromise = FingerprintJS.load()
    }
    return fpPromise
}

export async function getFingerprint(): Promise<string> {
    try {
        const fp = await getFpInstance()
        const result = await fp.get()
        return result.visitorId
    } catch {
        const key = "__fp_fallback__"
        let id = localStorage.getItem(key)
        if (!id) {
            id = crypto.randomUUID()
            localStorage.setItem(key, id)
        }
        return id
    }
}

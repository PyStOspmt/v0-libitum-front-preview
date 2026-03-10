"use server"

import { revalidatePath } from "next/cache"

export async function revalidateAppPath(path: string) {
    revalidatePath(path)
}

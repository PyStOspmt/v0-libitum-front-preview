"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Verified } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface TutorVerificationDialogProps {
    isTutorVerified: boolean
}

export function TutorVerificationDialog({ isTutorVerified }: TutorVerificationDialogProps) {
    const pathname = usePathname()

    if (isTutorVerified || pathname?.includes("/tutor/onboarding")) {
        return null
    }

    return (
        <div className="fixed w-dvw h-dvh top-0 z-[50] left-0 bg-black/50">
            <Dialog open={true}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Verified className="h-5 w-5" />
                            Верифікація
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Будь ласка, пройдіть верифікацію, щоб отримати доступ до кабінету
                    </DialogDescription>
                    <DialogFooter className="mx-auto">
                        <Link href="/tutor/onboarding">
                            <Button>Перейти до верифікації</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

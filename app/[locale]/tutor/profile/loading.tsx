import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TutorProfileLoading() {
    return (
        <SidebarLayout userType="tutor">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="mb-6 space-y-2">
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="h-5 w-96" />
                </div>

                <div className="space-y-6">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-32 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </SidebarLayout>
    )
}

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SidebarLayout } from "@/components/sidebar-layout"

export default function TutorStatsLoading() {
  return (
    <SidebarLayout userType="tutor">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}

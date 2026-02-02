"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminSupportAccessPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-5xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Support Access</h1>
            <p className="text-muted-foreground">
              Режим підтримки для входу в кабінет користувача без зміни його пароля.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Створити доступ</CardTitle>
              <CardDescription>Вкажіть email користувача, щоб згенерувати тимчасовий доступ.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="email користувача" type="email" />
              <Button>Згенерувати доступ</Button>
              <p className="text-xs text-muted-foreground">
                Доступ діє обмежений час і логуються всі дії адміністратора.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Останні сесії підтримки</CardTitle>
              <CardDescription>Історія створених доступів для аудиту.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>Марія Петренко • 2 години тому • завершено</div>
              <div>Іван Сидоренко • 1 день тому • завершено</div>
              <div>Олена Коваль • 3 дні тому • скасовано</div>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

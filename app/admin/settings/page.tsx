"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SidebarLayout userType="admin">
        <div className="container mx-auto max-w-4xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Налаштування платформи</h1>
            <p className="text-muted-foreground">Управління глобальними налаштуваннями</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Загальні налаштування</CardTitle>
              <CardDescription>Основні параметри платформи</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Назва платформи</Label>
                <Input id="platform-name" defaultValue="Libitum Education" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email підтримки</Label>
                <Input id="support-email" type="email" defaultValue="support@libitum.com" />
              </div>
              <Button>Зберегти зміни</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Фінансові налаштування</CardTitle>
              <CardDescription>Параметри оплати та комісій</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lead-price">Вартість ліда (₴)</Label>
                <Input id="lead-price" type="number" defaultValue="1300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trial-lessons">Кількість пробних занять</Label>
                <Input id="trial-lessons" type="number" defaultValue="3" />
              </div>
              <Button>Зберегти зміни</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Таймінги</CardTitle>
              <CardDescription>Налаштування часових обмежень</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="response-time">Час на відповідь (години)</Label>
                <Input id="response-time" type="number" defaultValue="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status-update-time">Час на оновлення статусу (години)</Label>
                <Input id="status-update-time" type="number" defaultValue="2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-time">Час на оплату (години)</Label>
                <Input id="payment-time" type="number" defaultValue="24" />
              </div>
              <Button>Зберегти зміни</Button>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

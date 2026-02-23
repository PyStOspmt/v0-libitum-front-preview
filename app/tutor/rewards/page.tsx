"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Star, ArrowUpRight, TrendingUp, Gem, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function TutorRewardsPage() {
  const { toast } = useToast()
  const [lcBalance, setLcBalance] = useState(1250)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const rewards = [
    {
      id: "discount-lead",
      title: "Знижка на ліда (20%)",
      description: "Оплатити частину вартості наступного ліда. Мінімум 80% оплачується грошима.",
      price: 200,
      icon: <TrendingUp className="h-6 w-6 text-[#00c5a6]" />,
      color: "bg-[#e8fffb]",
      available: true
    },
    {
      id: "boost-profile",
      title: "Підняття анкети",
      description: "Тимчасовий буст видимості в каталозі на 24 години.",
      price: 500,
      icon: <ArrowUpRight className="h-6 w-6 text-[#ff9800]" />,
      color: "bg-[#fff8e1]",
      available: true
    },
    {
      id: "profile-badge",
      title: "Виділення профілю",
      description: "Особлива рамка та бейдж для підвищення CTR на тиждень.",
      price: 800,
      icon: <Star className="h-6 w-6 text-[#e91e63]" />,
      color: "bg-[#fce4ec]",
      available: true
    },
    {
      id: "super-discount",
      title: "Супер-знижка (50%)",
      description: "Знижка 50% на вартість наступного ліда.",
      price: 1500,
      icon: <Gem className="h-6 w-6 text-[#9c27b0]" />,
      color: "bg-[#f3e5f5]",
      available: false,
      requirement: "Потрібно 1500 LC"
    }
  ]

  const history = [
    { id: 1, date: "2026-02-19", action: "Своєчасне заповнення звіту", amount: "+10", type: "earn" },
    { id: 2, date: "2026-02-18", action: "Отримано відгук (5 зірок)", amount: "+50", type: "earn" },
    { id: 3, date: "2026-02-15", action: "Купівля: Підняття анкети", amount: "-500", type: "spend" },
    { id: 4, date: "2026-02-10", action: "Підключення Telegram", amount: "+50", type: "earn" },
    { id: 5, date: "2026-02-01", action: "Daily Streak (7 днів)", amount: "+100", type: "earn" },
  ]

  const handlePurchase = () => {
    if (lcBalance >= selectedReward.price) {
      setLcBalance(prev => prev - selectedReward.price)
      setIsConfirmOpen(false)
      toast({
        title: "Успішно придбано!",
        description: `Ви отримали: ${selectedReward.title}. Баланс оновлено.`,
      })
      setSelectedReward(null)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="p-6 lg:p-10 max-w-[1200px] mx-auto space-y-8 font-sans">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-[32px] lg:text-[40px] font-bold text-[#121117] tracking-tight">Магазин винагород</h1>
              <p className="text-[#69686f] mt-1 text-[16px]">Обмінюйте Libitum Coins на корисні бонуси</p>
            </div>
            
            <div className="bg-white rounded-[16px] p-4 border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center gap-4 inline-flex">
              <div className="h-12 w-12 rounded-[12px] bg-[#f0f3f3] flex items-center justify-center shrink-0">
                <Coins className="h-6 w-6 text-[#121117]" />
              </div>
              <div>
                <p className="text-[13px] font-[600] text-[#69686f]">Ваш баланс</p>
                <div className="text-[24px] font-bold text-[#121117] leading-none mt-1">{lcBalance} LC</div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content - Rewards Shop */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-[20px] font-bold text-[#121117]">Доступні винагороди</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="rounded-[20px] border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className={`h-12 w-12 rounded-[12px] flex items-center justify-center ${reward.color}`}>
                          {reward.icon}
                        </div>
                        <Badge variant="outline" className="bg-[#f0f3f3] border-0 text-[#121117] font-[600] px-3 py-1 text-[14px]">
                          {reward.price} LC
                        </Badge>
                      </div>
                      <CardTitle className="text-[18px]">{reward.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-[14px] text-[#69686f] leading-relaxed">
                        {reward.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-slate-100 mt-auto">
                      {reward.available && lcBalance >= reward.price ? (
                        <Button 
                          className="w-full bg-[#121117] hover:bg-[#121117]/90 text-white font-[600] h-[44px] rounded-[8px]"
                          onClick={() => {
                            setSelectedReward(reward)
                            setIsConfirmOpen(true)
                          }}
                        >
                          Придбати
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          disabled 
                          className="w-full h-[44px] rounded-[8px] bg-[#f8f9fb] border-slate-200 text-[#69686f] font-[600]"
                        >
                          {reward.requirement || "Недостатньо коштів"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar - History & Info */}
            <div className="space-y-6">
              {/* Info Box */}
              <div className="bg-[#e8fffb] rounded-[24px] p-6 border border-[#00c5a6]/20">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="h-5 w-5 text-[#00a389]" />
                  <h3 className="text-[18px] font-bold text-[#00a389]">Як отримати LC?</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-[14px] text-[#00a389]/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Щоденний вхід (Streak)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[14px] text-[#00a389]/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Своєчасне заповнення звітів</span>
                  </li>
                  <li className="flex items-start gap-2 text-[14px] text-[#00a389]/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Отримання хороших відгуків</span>
                  </li>
                  <li className="flex items-start gap-2 text-[14px] text-[#00a389]/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Підключення Telegram бота</span>
                  </li>
                </ul>
              </div>

              {/* History */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <h3 className="text-[18px] font-bold text-[#121117] mb-6">Історія операцій</h3>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div>
                        <p className="text-[14px] font-[500] text-[#121117]">{item.action}</p>
                        <p className="text-[12px] text-[#69686f] mt-0.5">{new Date(item.date).toLocaleDateString('uk-UA')}</p>
                      </div>
                      <span className={`text-[14px] font-[700] ${item.type === 'earn' ? 'text-[#00c5a6]' : 'text-[#121117]'}`}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Dialog */}
          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className="max-w-md rounded-[24px] p-8 font-sans">
              <DialogHeader>
                <DialogTitle className="text-[24px] font-bold text-[#121117] mb-2">Підтвердження покупки</DialogTitle>
                <DialogDescription className="text-[15px] text-[#69686f]">
                  Ви збираєтесь придбати "{selectedReward?.title}" за {selectedReward?.price} LC.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-6">
                <div className="flex items-center justify-between p-4 bg-[#f0f3f3] rounded-[12px]">
                  <span className="text-[15px] font-[600] text-[#121117]">Поточний баланс:</span>
                  <span className="text-[15px] font-bold text-[#121117]">{lcBalance} LC</span>
                </div>
                <div className="flex items-center justify-between p-4 mt-2">
                  <span className="text-[15px] font-[600] text-[#121117]">Вартість:</span>
                  <span className="text-[15px] font-bold text-[#e53935]">- {selectedReward?.price} LC</span>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-slate-200 mt-2">
                  <span className="text-[15px] font-[600] text-[#121117]">Залишок:</span>
                  <span className="text-[18px] font-bold text-[#00c5a6]">{lcBalance - (selectedReward?.price || 0)} LC</span>
                </div>
              </div>

              <DialogFooter className="gap-3 sm:gap-0">
                <Button 
                  variant="outline" 
                  onClick={() => setIsConfirmOpen(false)}
                  className="flex-1 h-[48px] rounded-[8px] border-2 border-[#121117] text-[#121117] font-[600]"
                >
                  Скасувати
                </Button>
                <Button 
                  onClick={handlePurchase}
                  className="flex-1 h-[48px] rounded-[8px] bg-[#00c5a6] hover:bg-[#00a389] text-white font-[600] border-2 border-transparent"
                >
                  Підтвердити
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

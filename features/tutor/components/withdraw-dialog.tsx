"use client"

import { CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WithdrawDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    availableForWithdraw: number
    withdrawAmount: string
    onWithdrawAmountChange: (value: string) => void
    withdrawMethod: string
    onWithdrawMethodChange: (value: string) => void
    onWithdraw: () => void
}

export function WithdrawDialog({
    isOpen,
    onOpenChange,
    availableForWithdraw,
    withdrawAmount,
    onWithdrawAmountChange,
    withdrawMethod,
    onWithdrawMethodChange,
    onWithdraw,
}: WithdrawDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Виведення коштів</DialogTitle>
                    <DialogDescription>Введіть суму та оберіть спосіб виведення</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="rounded-2xl border border-primary/15 bg-primary/10 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-600">Доступно для виведення:</span>
                            <span className="text-2xl font-bold text-primary">{availableForWithdraw} грн</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Сума виведення *</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => onWithdrawAmountChange(e.target.value)}
                            placeholder="0"
                            min="0"
                            max={availableForWithdraw}
                        />
                        <p className="text-xs text-muted-foreground">Мінімальна сума виведення - 100 грн</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Спосіб виведення</Label>
                        <Select value={withdrawMethod} onValueChange={onWithdrawMethodChange}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="card">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        <span>Банківська картка (2-3 дні)</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="bank">Банківський рахунок (1-2 дні)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {withdrawMethod === "card" && (
                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Номер картки</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} />
                        </div>
                    )}

                    {withdrawMethod === "bank" && (
                        <div className="space-y-2">
                            <Label htmlFor="iban">IBAN</Label>
                            <Input id="iban" placeholder="UA123456789012345678901234567" maxLength={29} />
                        </div>
                    )}

                    <div className="rounded-2xl border border-amber-200/60 bg-amber-50/70 p-3 text-sm text-amber-900">
                        <p className="font-medium">Комісія: 0 грн</p>
                        <p className="text-xs text-amber-700">Платформа не стягує комісію за виведення коштів</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
                        Скасувати
                    </Button>
                    <Button onClick={onWithdraw} className="rounded-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        Вивести кошти
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

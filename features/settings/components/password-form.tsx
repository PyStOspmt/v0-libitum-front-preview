"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { passwordSchema, type PasswordValues } from "@/features/settings/schemas/settings.schema"
import { useToast } from "@/hooks/use-toast"

import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"

export function PasswordForm() {
  const { toast } = useToast()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: PasswordValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Пароль змінено",
      description: "Ваш пароль успішно оновлено",
    })
    
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#121117] font-[600]">Поточний пароль</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showCurrentPassword ? "text" : "password"} 
                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" 
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#121117] font-[600]">Новий пароль</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showNewPassword ? "text" : "password"} 
                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" 
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#121117] font-[600]">Підтвердження</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    className="rounded-[8px] border-slate-200/80 focus-visible:ring-[#00c5a6]" 
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full rounded-[8px] bg-[#121117] text-white hover:bg-[#121117]/90 font-[600] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        >
          {isSubmitting ? "Збереження..." : "Змінити пароль"}
        </Button>
      </form>
    </Form>
  )
}

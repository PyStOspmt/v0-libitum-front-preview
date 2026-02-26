"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormDescription,FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { notificationSchema, type NotificationValues } from "@/features/settings/schemas/settings.schema"
import { useToast } from "@/hooks/use-toast"

import { useForm } from "react-hook-form"

export function NotificationForm() {
  const { toast } = useToast()

  const form = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailReminders: true,
      smsReminders: false,
      marketingEmails: false,
    },
  })

  const onSubmit = async (values: NotificationValues) => {
    toast({
      title: "Налаштування оновлено",
      description: "Ваші вподобання щодо сповіщень збережено",
    })
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="emailReminders"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Email нагадування</FormLabel>
                <FormDescription>
                  Отримуйте нагадування про майбутні заняття на email
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    form.handleSubmit(onSubmit)()
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smsReminders"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">SMS нагадування</FormLabel>
                <FormDescription>
                  Отримуйте нагадування про майбутні заняття по SMS
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    form.handleSubmit(onSubmit)()
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marketingEmails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Новини та пропозиції</FormLabel>
                <FormDescription>
                  Отримуйте інформацію про нові функції та спеціальні пропозиції
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    form.handleSubmit(onSubmit)()
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

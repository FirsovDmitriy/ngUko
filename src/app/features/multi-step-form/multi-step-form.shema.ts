import { z } from 'zod'

export const messageTypeSchema = z.object({
  messageType: z.enum(['email', 'web_push']),
})

export type MessageType = z.infer<typeof messageTypeSchema>

export const contentMessageSchema = z.discriminatedUnion('messageType', [
  z.object({
    messageType: z.literal('email'),
    emailTemplate: z.string().trim().nonempty(),
    emailFrom: z.string().trim().nonempty(),
    emailRecipients: z.array(z.string()),
    subject: z.string().trim().nonempty(),
  }),
  z.object({
    messageType: z.literal('web_push'),
  }),
])

export type ContentMessage = z.infer<typeof contentMessageSchema>

export const deliverySettingsShema = z.object({
  messageName: z.string().trim().nonempty(),
  scheduleDelivery: z.boolean(),
  deliveryDateTime: z.discriminatedUnion('scheduleDelivery', [
    z.object({
      scheduleDelivery: z.literal('now'),
    }),
  ]),
})

export const MessageBuilderSchema = contentMessageSchema.and(deliverySettingsShema);

// Чистый TypeScript тип, который ожидает ваш бэкенд / API
export type MessageBuilder = z.infer<typeof MessageBuilderSchema>;

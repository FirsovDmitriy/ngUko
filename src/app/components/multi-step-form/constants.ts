export const messageType = {
  EMAIL: 'email',
  MOBILE_PUSH: 'mobilePush',
  WEB_PUSH: 'webPush'
} as const

export const steps = {
  MESSAGE_TYPE: 'messageType',
  MESSAGE_CONTENT: 'messageContent',
  COMMON_SETTINGS: 'commonSettings'
} as const

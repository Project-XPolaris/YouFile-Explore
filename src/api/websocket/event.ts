export type NotificationEvent = 'SearchTaskComplete'
export interface NotificationMessage {
  event:NotificationEvent,
  id?:string
}

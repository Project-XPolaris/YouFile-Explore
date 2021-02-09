export type NotificationEvent = 'SearchTaskComplete' | 'CopyTaskComplete' | 'DeleteTaskDone'
export interface NotificationMessage {
  event:NotificationEvent,
  id?:string
}

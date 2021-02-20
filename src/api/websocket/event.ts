export type NotificationEvent = 'SearchTaskComplete' | 'CopyTaskComplete' | 'DeleteTaskDone' | 'SearchHit'
export interface NotificationMessage {
  event:NotificationEvent,
  id?:string
}
export interface SearchHitEventExtend {
  name:string
  path:string
  type:string
}

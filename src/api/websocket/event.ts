export type NotificationEvent = 'SearchTaskComplete' | 'CopyTaskComplete' | 'DeleteTaskDone' | 'SearchHit' | 'UnarchiveFileComplete' | 'MoveTaskComplete'
export interface NotificationMessage {
  event:NotificationEvent,
  id?:string
}
export interface SearchHitEventExtend {
  name:string
  path:string
  type:string
}

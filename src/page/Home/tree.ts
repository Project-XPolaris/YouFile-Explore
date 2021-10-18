import moment, { Moment } from 'moment'

export class FileNode {
  name: string
  path: string
  type: string
  size:number
  thumbnail?:string
  target:string
  parent:FileNode | undefined
  children: FileNode[] | undefined
  modifyTime:Moment
  constructor ({
    name, path, target, size, parent, children, type, thumbnail, modifyTime
  }:{name: string
    path: string
    type: string
    size:number
    thumbnail?:string
    target:string
    parent:FileNode | undefined
    children: FileNode[] | undefined
    modifyTime:string
  }) {
    this.name = name
    this.path = path
    this.type = type
    this.size = size
    this.thumbnail = thumbnail
    this.target = target
    this.parent = parent
    this.children = children
    this.modifyTime = moment(modifyTime, 'YYYY-MM-DD HH:mm:ss')
  }
}

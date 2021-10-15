export class FileNode {
  name: string
  path: string
  type: string
  size:number
  thumbnail?:string
  target:string
  parent:FileNode | undefined
  children: FileNode[] | undefined
  constructor ({
    name, path, target, size, parent, children, type, thumbnail
  }:{name: string
    path: string
    type: string
    size:number
    thumbnail?:string
    target:string
    parent:FileNode | undefined
    children: FileNode[] | undefined}) {
    this.name = name
    this.path = path
    this.type = type
    this.size = size
    this.thumbnail = thumbnail
    this.target = target
    this.parent = parent
    this.children = children
  }
}

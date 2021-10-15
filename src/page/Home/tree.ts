export interface FileNode {
  name: string
  path: string
  type: string
  size:number
  thumbnail?:string
  target:string
  parent:FileNode | undefined
  children: FileNode[] | undefined
}

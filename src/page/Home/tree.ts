export interface FileNode {
  name: string
  path: string
  type: string
  thumbnail?:string
  target:string
  parent:FileNode | undefined
  children: FileNode[] | undefined
}

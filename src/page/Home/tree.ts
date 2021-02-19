export interface FileNode {
  name: string
  path: string
  type: string
  parent:FileNode | undefined
  children: FileNode[] | undefined
}

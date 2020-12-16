import { FileItem, readDir } from '../../api/dir'
import { convertSlash } from '../../utils/path'

export interface FileNode {
  id : string
  name: string
  path: string
  type: string
  parent:FileNode | undefined
  children: FileNode[] | undefined
}
export class FileTree {
  root : FileNode = {
    id: '/',
    name: 'root',
    path: '/',
    type: 'Directory',
    parent: undefined,
    children: undefined
  }

  private generateNode (source:FileItem, parent:FileNode):FileNode {
    return {
      id: source.path,
      name: source.name,
      path: convertSlash(source.path),
      children: undefined,
      parent,
      type: source.type
    }
  }

  public async loadByPath (path:string) {
    let cur = this.root
    const parts = path === '/' ? ['/'] : path.split('/')
    for (let index = 0; index < parts.length; index++) {
      if (cur.children === undefined) {
        const fetchPath = parts.slice(0, index + 1).join('\\')
        const response = await readDir(fetchPath)
        cur.children = response.map(it => (this.generateNode(it, cur)))
      }
      // to next
      // not last part
      if (index + 1 < parts.length) {
        const targetNode = cur.children.find(it => it.name === parts[index + 1])
        if (targetNode) {
          cur = targetNode
        } else {
          return
        }
      }
    }
    return cur
    // console.log(this.root.children)
  }
}

export const getPathBasename = (path: string): string | undefined => {
  return path.split(/[\\/]/).pop()
}

export const convertSlash = (path: string): string => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  // eslint-disable-next-line no-control-regex
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path)
  // console.table({ isExtendedLengthPath, hasNonAscii })
  if (isExtendedLengthPath || hasNonAscii) {
    return path
  }
  return path.replace(/\\/g, '/').replace('\\', '/')
}

export const convertPath = (path:string):string => {
  return path.replace(/\\/g, '/')
}
export interface PathPart {
  idx:number
  name:string
}
export const getCollapsePath = (list:PathPart[],maxLength:number,gap:number):PathPart[] => {
  if (list.length === 0) {
    return []
  }

  const last = list.pop()

  if (!last) {
    return []
  }
  if (last.name.length > maxLength) {
    const lastName  = last.name.slice(0,maxLength - 3) + "..."
    return [{name:lastName,idx:last.idx}]
  }
  // swap: first to end
  const start = list.shift()
  if (start) {
    list.push(start)
  }


  const pick:PathPart[] = [];
  let totalLength = last.name.length;
  for (let idx = list.length - 1; idx >= 0; idx--) {
    const part = list[idx]
    totalLength += part.name.length + gap
    pick.unshift(part)
    if (totalLength > maxLength) {
      break;
    }
  }
  if (pick.length > 1) {
    pick.shift()
    const out = pick.pop()
    if (out) {
      pick.unshift(out)
    }
  }

  pick.push(last)
  return pick
}

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

export const convertPathWitOS = (path:string):string => {
  if (window.navigator.platform === 'Win32') {
    return path.replace('/', '\\')
  }
  return path.replace('\\', '/')
}

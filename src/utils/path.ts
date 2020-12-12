export const getPathBasename = (path:string) : string | undefined => {
  return path.split(/[\\/]/).pop()
}

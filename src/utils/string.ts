export const undefinedOrString = (text:string | undefined):string | undefined => {
  if (text && text.length > 0) {
    return text
  }
  return undefined
}
export const formatFstabOption = (option:{[key:string]:string}):string => {
  const parts : string[] = []
  Object.getOwnPropertyNames(option).forEach(key => {
    if (option[key] === '') {
      parts.push(key)
    } else {
      parts.push(`${key}=${option[key]}`)
    }
  })
  return parts.join(',')
}

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

export const longestCommonPrefix = (strs:string[]):string => {
  const firstStrs = strs[0]
  let result = ''
  if (!strs.length) {
    return result
  }
  for (let i = 0; i < firstStrs.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (firstStrs[i] !== strs[j][i]) {
        return result
      }
    }
    result += firstStrs[i]
  }
  return result
}

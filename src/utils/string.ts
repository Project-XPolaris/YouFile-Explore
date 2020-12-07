export const undefinedOrString = (text:string | undefined):string | undefined => {
  if (text && text.length > 0) {
    return text
  }
  return undefined
}

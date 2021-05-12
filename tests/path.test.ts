test("pathCollaps",() => {
  const parts = ["123","456","23454","bf34782gd783"]
  if (parts.length === 0) {
    return []
  }
  const last = parts.pop()
  if (!last) {
    return
  }
  // swap: first to end
  const start = parts.shift()
  if (start) {
    parts.push(start)
  }

  const pick = [];
  let totalLength = last.length;
  for (let idx = parts.length - 1; idx >= 0; idx--) {
    const part = parts[idx]
    totalLength += part.length
    pick.unshift(part)
    if (totalLength > 20) {
      break;
    }
  }
  console.log(pick)
  if (pick.length > 1) {
    pick.shift()
    pick.unshift(pick.pop())
  }

  pick.push(last)
  console.log(pick)
})

function RegX () {
  return this
}
RegX.prototype.url = function (url) {
  return url && /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\\/?%&=]*)?$/i.test(url)
}

export const regX = new RegX()
export const wbk = new WebSocket('ws://39.108.171.235:7272')

wbk.onopen = function () {
  // console.log(arguments)
}
wbk.onerror = function () {
  // console.log(arguments)
}
wbk.onmessage = function () {
  // console.log(arguments)
}
wbk.init = function () {
  wbk.send(localStorage.getItem('user'))
}

export default {
  regX,
  wbk
}

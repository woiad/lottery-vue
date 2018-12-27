let util = {}
export default util
util.getId = function (_id) {
  return document.getElementById(_id)
}
util.nameReg = function (name) {
  let reg = /\/jpeg/g
  return reg.test(name)
}
util.title = function (title) {
  title = title || 'Admin'
  window.document.title = title
}

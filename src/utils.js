module.exports = {
  dt: '_#koatBinder#_',
  getType: (data) => {
    return Object.prototype.toString.call(data)
  },
  types: {
    Array: `[object Array]`,
    Object: `[object Object]`
  }
}

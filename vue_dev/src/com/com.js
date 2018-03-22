const _storage = localStorage
const storage = {
  getItem: (item) => {
    return _storage.getItem(item)
  },
  setItem: (item, str) => {
    return _storage.setItem(item, str)
  },
  removeItem: (item) => {
    return _storage.removeItem(item)
  }
}
exports =  storage

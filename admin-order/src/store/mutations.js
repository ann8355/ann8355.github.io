const mutations = {
  setChart (state, data) {
    state.chartData = data
  },
  setContents (state, data) {
    state.contents = data
  },
  setObj (state, obj) {
    state.obj = obj
  },
  deleteItem (state, obj) {
    state.contents.forEach(function (element, index) {
      if (element.productName === obj) {
        state.contents.splice(index, 1)
      }
    })
  },
  updateItem (state, obj) {
    obj.item.status = obj.status
    state.contents.find(function (item, index, array) {
      if (item.productName === obj.item.productName) {
        state.contents.splice(index, 1, obj.item)
      }
    })
  },
  createItem (state, obj) {
    obj.item.status = obj.status
    state.contents.unshift(obj.item)// 新增至最前面
  }
}

export default mutations

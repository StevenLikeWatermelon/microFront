
// 递归获取第一个没有children的数组项目
const getFisrtItemWithNoChildren = (listArr) => {
  const firstItem = listArr[0] || {}
  // 有子项目的话继续往下找
  if (firstItem.children && firstItem.children.length > 0) {
    getFisrtItemWithNoChildren(firstItem.children)
  } else {
    return firstItem
  }
}
// 递归补全url前缀

const fixPreUrlRecursion = (listArr = [], getters) => {
  listArr.forEach(item => {
    // 有子项目的话继续往下找
    if (item.children && item.children.length > 0) {
      fixPreUrlRecursion(item.children, getters)
    } else {
      item.preUrl = getters.sysCodeConfig[item.sysCode]
      item.sysURLWithPre = `${item.preUrl}${item.resPath}?id=${item.id}&token=${getters.token}&resId=${item.resId}&toggleMap=true`
    }
  })
  return listArr
}

const getters = {
  sysCodeConfig: state => {
    const tpmObj = {}
    state.menu.sysCodeConfig.forEach(item => {
      tpmObj[item.sysCode] = item.sysURL
    })
    return tpmObj
  },
  menuListWithPre: (state, getters) => fixPreUrlRecursion([...state.menu.menuList], getters),
  homePageConfig: (state, getters) => getFisrtItemWithNoChildren(getters.menuListWithPre),
  firstIframeUrl: (state, getters) => getters.homePageConfig?.sysURLWithPre,
  firstIframeTitle: (state, getters) => getters.homePageConfig?.resName,
  firstIframeIcon: (state, getters) => getters.homePageConfig?.icon,
  firstIframeId: (state, getters) => getters.homePageConfig?.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters

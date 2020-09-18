
// 防止url书写不规范，彻底去掉URL结尾的/
const deleteEndSperate = (url) => {
  if (url?.endsWith('/')) {
    url = url.substr(0, url.length - 1)
  }
  return url
}
// 防止url书写不规范，如果路径忘记加/补上
const addStartSperate = (url) => {
  if (url?.startsWith('/')) {
    return url
  }
  return `/${url}`
}

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
      item.sysURLWithPre = `${item.preUrl}${addStartSperate(item.resPath)}?id=${item.id}&token=${getters.token}&resId=${item.resId}&toggleMap=true`
    }
  })
  return listArr
}

const getters = {
  sysCodeConfig: state => {
    const tpmObj = {}
    state.menu.sysCodeConfig.forEach(item => {
      // 防止URL书写不规范 自动去掉结尾的/
      item.sysURL = deleteEndSperate(item.sysURL)
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

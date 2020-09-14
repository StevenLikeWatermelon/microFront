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

const getters = {
  sysCodeConfig: state => state.menu.sysCodeConfig,
  menuList: state => state.menu.menuList,
  homePageConfig: state => getFisrtItemWithNoChildren(state.menu.menuList),
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters

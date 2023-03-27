// 封装三个方法，操作token
// 代码封分层，更清晰
const key = 'geek-itheima'
// 存token方法
export const SetToken = (token) => {
  localStorage.setItem(key, token)
}
// 取出token方法
export const getToken = () => localStorage.getItem(key)
// 删除token
export const removeToken = () => {
  localStorage.removeItem(key)
}

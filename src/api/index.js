// 接口方法
import request from '@/utils/request.js'
// 登录接口
export const loginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// 获取所有频道
export const allChannelListAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})
// 获取用户频道
export const gteuserChannelListAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})
// 获取文章列表
export const getarticlesListAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id,
      timestamp
    }
  })
}
// 对不喜欢文章进行反馈
export const disLikeAricleAPI = ({ artId }) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artId
    }
  })
}
// 具体的反馈内容
export const articleReportsAPI = ({ artId, type }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artId,
      type: type,
      remark: '暂无'
    }
  })
}
// 更新频道，让更新后的频道可以保存，不会刷新就复原
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
// 搜索接口
export const suggestListAPI = ({ keywords }) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: keywords
    }
  })
}

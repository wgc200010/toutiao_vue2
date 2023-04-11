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
// 文章详情页
export const articleDetailAPI = ({ artId }) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${artId}`
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
export const searchresultAPI = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})
// 关注作者
export const followedUserAPI = ({ target }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}
// 取消关注作者
export const unFollowedUserAPI = ({ uid }) => {
  return request({
    // 这uid只是个变量名, 把值拼接在url发给后台(无需指定参数名)
    url: `/v1_0/user/followings/${uid}`,
    method: 'DELETE'
  })
}
// 点赞
export const articleLikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 取消点赞
export const articleDisLikeAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}

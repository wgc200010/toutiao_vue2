<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 触底刷新，第一种方案解决首次进入页面就触发onload，使用:immediate-check="false" -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50">
        <articleitem v-for="obj in list" :key="obj.art_id" :artobj="obj" @disLikeEV="disLikefn" @fankuiEV="fankuifn"></articleitem>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import Articleitem from './Article-item.vue'
import { getarticlesListAPI, disLikeAricleAPI, articleReportsAPI } from '@/api/index.js'
import { Notify } from 'vant'
export default {
  props: {
    // list: Array
    channelid: Number
  },
  components: {
    Articleitem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      thetime: new Date().getTime(), // 用于分页
      isLoading: false
    }
  },
  async created () {
    // const res = await getarticlesListAPI({
    //   channel_id: this.channelid, timestamp: this.thetime
    // })
    // this.list = res.data.data.results
    // this.thetime = res.data.data.pre_timestamp
    this.getarticlesListFn()
  },
  methods: {
    // 将请求封装为该函数，避免多个方法重复编写
    async getarticlesListFn () {
      const res = await getarticlesListAPI({
        channel_id: this.channelid, timestamp: this.thetime
      })
      this.list = [...this.list, ...res.data.data.results]
      this.thetime = res.data.data.pre_timestamp // 保存时间戳，留给下次刷新
    },
    // 触底刷新刚打开网页，onload和create都会触发,并且是同样请求最新数据,造成了key重复
    async onLoad () {
      // 第二种方案解决首次进入页面就触发onload问题
      // console.log(this.list.length)
      // if (this.list.length === 0) {
      //   return
      // }
      // 将保存的时间戳发送
      const res2 = await getarticlesListAPI({
        channel_id: this.channelid, timestamp: this.thetime
      })

      this.list = [...this.list, ...res2.data.data.results]
      this.thetime = res2.data.data.pre_timestamp // 保存时间戳，留给下次刷新

      this.loading = false
      // 如果后台的所有数据都已加载完毕,就不再执行后续过程
      if (res2.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      this.list = []
      this.thetime = new Date().getTime()
      // const res = await getarticlesListAPI({
      //   channel_id: this.channelid, timestamp: this.thetime
      // })
      // this.list = res.data.data.results
      // this.thetime = res.data.data.pre_timestamp // 保存时间戳，留给下次刷新
      this.getarticlesListFn()
      this.isLoading = false
    },
    // 反馈不喜欢
    async disLikefn (id) {
      await disLikeAricleAPI({
        artId: id
      })
      // console.log(res)
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 具体反馈内容
    async fankuifn (id, value) {
      await articleReportsAPI({
        artId: id,
        type: value
      })
      // console.log(res)
      Notify({ type: 'success', message: '反馈成功' })
    }
  }
}
</script>

<style>
</style>

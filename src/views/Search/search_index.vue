<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <!-- 自动聚焦fofo自定义属性，也可以使用autofocus  -->
      <van-search placeholder="请输入搜索关键词" @input="inputfn" background="#007BFF" shape="round" v-fofo v-model="kw" @search="enterFn" />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list">
      <!-- v-html才能解析标签 -->
      <div class="sugg-item" v-for="(str, index) in searchlist" :key="index" v-html="lightfn(str,kw)" @click="clickFn(str)">
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history">
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="delfn" />
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(str,index) in history" :key="index" @click="hisfn(str)">{{str}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api/index.js'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖, 用的定时器
      searchlist: [],
      history: JSON.parse(localStorage.getItem('his')) || [] // 默认搜索历史
    }
  },
  methods: {
    // 内容改变触发
    async inputfn () {
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.searchlist = []
      }
      this.timer = setTimeout(async () => {
        // if (this.kw.length === 0) return // 防止空内容触发下面逻辑
        const res = await suggestListAPI({
          keywords: this.kw
        })
        // console.log(this.kw)
        this.searchlist = res.data.data.options
      }, 300)
    },
    // 处理关键字高亮,target关键字,originStr源字符串
    lightfn (str, target) {
      // replace默认值替换一次，且All也不能识别大小写
      // 为了识别大小写，需要用正则方法
      // 接口有问题，只能接受一个字母！！！！
      const reg = new RegExp(target, 'ig')
      return str.replace(reg, (match) => { // match是关键字匹配的值(尽量保持原样)
        return `<span style="color: red">${match}</span>`
      })
    },
    enterFn () {
      // console.log('dfsfsd')
      if (this.kw.length <= 0 || this.kw === ' ') { return }
      // this.history.push(this.kw)
      const newarr = []
      newarr.push(this.kw)
      // eslint-disable-next-line array-callback-return
      this.history.forEach(a => {
        if (!newarr.includes(a)) {
          newarr.push(a)
        }
      })
      console.log(newarr)
      this.history = newarr
      // 不加计时器，router在watch前执行，并销毁组件，watch就无法执行
      setTimeout(() => {
        this.$router.push({
          path: `/search/${this.kw}`
        })
      }, 0)
    },
    clickFn (str) {
      this.$router.push({
        path: `/search/${str}`
      })
    },
    hisfn (str) {
      this.$router.push({
        path: `/search/${str}`
      })
    },
    // 清除历史记录
    delfn () {
      this.history = []
    }
  },
  watch: {
    history () {
      localStorage.setItem('his', JSON.stringify(this.history))
    }
  }
}
</script>

   <style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>

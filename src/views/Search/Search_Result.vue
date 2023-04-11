<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <article-item v-for="obj in artList" :key="obj.art_id" :artobj="obj" :isshow="false" @click.native="$router.push(`/artdetail?aid=${obj.art_id}`)">
        </article-item>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchresultAPI } from '@/api/index.js'
import ArticleItem from '@/components/Article-item.vue'
export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1,
      artList: [],
      loading: false,
      finished: false
    }
  },
  async created () {
    const res = await searchresultAPI({
      page: this.page,
      q: this.$route.params.keywords
    })
    this.artList = res.data.data.results
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      if (this.artList.length > 0) {
        this.page++
        const res = await searchresultAPI({
          page: this.page,
          q: this.$route.params.keywords
        })
        // 如果后台的所有数据都已加载完毕,就不再执行后续过程
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.artList = [...this.artList, ...res.data.data.results]
        this.loading = false
      }
    }
  }
}
</script>

   <style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>

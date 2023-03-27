<template>
  <div>
    <div class="home_container">
      <!-- 二级路由页面 -->
      <router-view></router-view>
    </div>
    <div>
      <!-- 底部导航 -->
      <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o" to="/layout/home">首页</van-tabbar-item>
        <van-tabbar-item name="user" to="/layout/user" icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  data () {
    return {
      active: 'home'
    }
  }
}
</script>
<style lang="less">
.home_container {
  padding-bottom: 50px;
}
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>

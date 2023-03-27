<template>
  <div>
    <!-- 头部导航栏区域 -->
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img src="@/assets/logo.png" alt="" width="100px" height="30px">
        </template>
        <template v-slot:right>
          <van-icon name="search" size="0.48rem" color="white" @click="gotosearchfn" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 频道导航 -->
    <div class="pindaotab">
      <van-tabs v-model="channelid" animated sticky offset-top="1.22rem">
        <van-tab v-for="obj in channList" :key="obj.id" :title="obj.name" :name="obj.id">
          <Articlelist :channelid="channelid"></Articlelist>
        </van-tab>
      </van-tabs>
      <!-- 编辑频道，加号,添加标签  -->
      <van-icon name="plus" size="0.373333334rem" class="moreChannels" @click="popfn"></van-icon>
    </div>
    <!-- 频道管理弹出层 -->
    <van-popup v-model="show" class="channelpop">
      <ChannelEdit :userlist="channList" :allList="unCheckChannelList" @addchannelobjEV="addchannelobjfn" @successeditEV="issuccesseditfn" @removechannelobjEV="removechannelfn" @closepopEV="closepopfn" v-model="channelid"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { gteuserChannelListAPI, allChannelListAPI, updateChannelAPI } from '@/api/index.js'
import Articlelist from './components/Article-list.vue'
import ChannelEdit from './ChannelEdit.vue'
// 每次切换都会重新获取，加缓存也无效，可以将文章列表数组放入每个Article-list组件内部
export default {
  data () {
    return {
      channelid: 0,
      channList: [], // 用户频道
      allchannellist: [],
      show: false
    }
  },
  async created () {
    // 用户频道
    const res = await gteuserChannelListAPI()
    // console.log(res)
    this.channList = res.data.data.channels
    // 文章列表
    // this.channelChangeFn()
    const res2 = await allChannelListAPI()
    this.allchannellist = res2.data.data.channels
  },
  methods: {
    // async channelChangeFn () {
    //   const res2 = await getarticlesListAPI({
    //     channel_id: this.channelid, timestamp: (new Date()).getTime()
    //   })
    //   // console.log(res2)
    //   this.artlist = res2.data.data.results
    // }
    // 加号
    popfn () {
      this.show = true
    },
    // 关闭频道管理弹出层
    closepopfn (e) {
      this.show = !e
    },
    addchannelobjfn (channelobj) {
      // console.log(channelobj)
      this.channList.push(channelobj)
    },
    removechannelfn (obj) {
      const index = this.channList.findIndex(index => {
        return index === obj
      })
      this.channList.splice(index, 1)
    },
    async issuccesseditfn (e) {
      if (e === true) {
        await updateChannelAPI({ channels: this.channList })
      }
    },
    // 搜索页面跳转
    gotosearchfn () {
      this.$router.push('/search')
    }
  },
  components: {
    Articlelist,
    ChannelEdit
  },
  computed: {
    unCheckChannelList () {
      // const newarr = this.allchannellist.filter(bigObj => {
      //   const index = this.channList.findIndex(smallObj => {
      //     return smallObj.id === bigObj.id
      //   })
      //   // 如果找到
      //   if (index > -1) {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
      // return newarr
      // 简化（通常不这样写）
      return this.allchannellist.filter(obj => (this.channList.findIndex(obj2 => obj2.id === obj.id) === -1)
      )
    }

  }
}
</script>

<style lang="less" scoped>
.pindaotab {
  margin-top: 1.2rem;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channelpop {
  width: 100vw;
  height: 100vh;
}
</style>

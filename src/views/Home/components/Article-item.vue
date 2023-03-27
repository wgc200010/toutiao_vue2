<template>
  <div><!-- 文章单元格 -->
    <van-cell>
      <!-- 标题插槽 -->
      <template #title>
        <div class="title-box">
          <span>{{ artobj.title }}</span>
          <!-- 单图 -->
          <img class="thumb" v-if="artobj.cover.type==1" :src="artobj.cover.images[0]" alt="">
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="artobj.cover.type==3">
          <img v-for="(imgUrl,index) in artobj.cover.images" :src="imgUrl" alt="" class="thumb" :key="index">
        </div>
      </template>
      <!-- label插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artobj.aut_name }}</span>
            <span>{{ artobj.comm_count }}条评论</span>
            <span>{{ formatTime( artobj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" :cancel-text="bottomtext" get-container="body" @cancel="onCancel" @close="onclose" />
  </div>

</template>

<script>
// 点击反馈，进行数据切换
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report.js'
export default {
  props: {
    artobj: Object
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomtext: '取消'
    }
  },
  methods: {
    formatTime: timeAgo, // 函数体为，timeAgo方法
    onSelect (action, item) {
      // console.log(action, item)action数据对象
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (action.name === '反馈垃圾') {
        this.actions = secondActions
        this.bottomtext = '返回'
      } else if (action.name === '不喜欢') {
        this.$emit('disLikeEV', this.artobj.art_id)
        // 无论反馈是否成功
        this.show = false
      } else { // 具体的反馈
        this.$emit('fankuiEV', this.artobj.art_id, action.value) // value是反馈类型
        this.show = false // 直接关闭，触发onclose切换数组
      }
      // this.show = false
    },
    onCancel () {
      if (this.bottomtext === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomtext = '取消'
      }
    },
    // 关闭面板触发
    onclose () {
      this.actions = firstActions
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
// 图片
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
// 三个图容器
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>

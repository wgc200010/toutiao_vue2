<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <!-- 关闭弹出层 -->
        <van-icon name="cross" size="0.37333334rem" color="white" @click="closepopfn" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span>我的频道
          <span class="small-title">
            点击{{isEdit ? '删除' :'进入'}}频道
          </span>
        </span>
        <span @click="editfn">{{isEdit ? '完成' : '编辑'}}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="obj in userlist" :key="obj.id" @click="removeFn(obj)">
          <div class="channel-item van-hairline--surround">
            {{obj.name}}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-show="isEdit && obj.id !==0">
              <template #content>
                <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="0.32rem" />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="obj in allList" :key="obj.id" @click="morefn(obj)">
          <div class="channel-item van-hairline--surround">{{obj.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant'
export default {
  props: {
    userlist: Array,
    allList: Array
  },
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    // "编辑"按钮
    editfn () {
      this.isEdit = !this.isEdit
      // 传递编辑完成参数，防止未点编辑完成时就触发更新
      if (this.isEdit === false) {
        this.$emit('successeditEV', true)
        Notify({ type: 'success', message: '已保存' })
      }
    },
    morefn (channelobj) {
      if (this.isEdit === true) { // 编辑状态
        // console.log(this.allList)
        // console.log(this.userlist)
        // console.log(channelobj)
        this.$emit('addchannelobjEV', channelobj)
      }
    },
    removeFn (obj) {
      // 如果处于编辑状态就删除
      if (this.isEdit === true && obj.name !== '推荐') { // 编辑状态
        // console.log(this.allList)
        // console.log(this.userlist)
        // console.log(channelobj)
        this.$emit('removechannelobjEV', obj)
      } else { // 切换频道
        this.$emit('input', obj.id) // 触发v-model的input事件，将值传递给v-model变量
        this.$emit('closepopEV', true) // 关闭频道管理弹出层
      }
    },
    // // 关闭频道管理弹出层
    closepopfn () {
      this.$emit('closepopEV', true)
      // this.isEdit = false
    }
  }
}
</script>

   <style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>

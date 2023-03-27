<template>
  <div>
    <van-nav-bar title="登陆页面" />
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" name="mobile" label="手机号" placeholder="手机号" required :rules="[{ required: true, message: '请填写正确手机号',pattern:/^1[3-9]\d{9}$/ }]" />
      <van-field v-model="user.code" type="password" name="code" label="验证码" placeholder="验证码" required :rules="[{ required: true, message: '请输入正确验证码' ,pattern:/^\d{6}$/}]" />
      <div style="margin: 16px;">
        <van-button round :disabled="isloading" block :loading="isloading" type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { SetToken } from '@/utils/token.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: '' // 固定246810 验证码
      },
      isloading: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log(values)
      // console.log(this.user) // 等价
      this.isloading = true
      try {
        const res = await loginAPI(values)
        const { token } = res.data.data
        Notify({ type: 'success', message: '登陆成功，请稍等' })
        // console.log(token)
        // console.log(refresh_token)
        SetToken(token)
        // 保存token后跳转,都对
        // this.$router.push('/')
        this.$router.push('/layout/home')
      } catch (err) {
        // console.error(err)
        Notify({ type: 'danger', message: '手机号或验证码错误' })
      }
      this.isloading = false
    }
  }
}
</script>

<style lang="less" scoped>
// 非必要不用类
// .van-nav-bar {
//   background-color: #007bff;
//   /deep/ .van-nav-bar__title {
//     color: white;
//   }
// }
</style>

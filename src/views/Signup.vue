<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册者也账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">用户名</label>
        <validate-input v-model="formData.name" placeholder="请输入用户名" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input :rules="nameRules" v-model="formData.nickName" placeholder="请输入昵称" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="formData.password" />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input type="password" placeholder="请再次密码" :rules="repeatPasswordRules"
          v-model="formData.repeatPassword" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import createMessage from '../components/createMessage'

export default defineComponent({
  name: 'Signup',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const formData = reactive({
      name: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '用户名不能为空' },
      { type: 'name', message: '请输入正确的用户名格式' }
    ]
    const nameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          name: formData.name,
          password: formData.password,
          nickName: formData.nickName
        }
        axios.post('/users/', payload).then(data => {
          createMessage('注册成功 正在跳转登录页面', 'success', 2000)
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit,
      formData
    }
  }
})
</script>

<style>
.w-330 {
  max-width: 330px;
}
</style>

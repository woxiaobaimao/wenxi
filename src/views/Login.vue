<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">用户名</label>
        <validate-input v-model="nameVal" placeholder="请输入用户名" type="text" ref="inputRef" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import createMessage from '../components/createMessage'

const nameVal = ref('')
const router = useRouter()
const store = useStore()
const nameRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'name', message: '请输入正确的电子邮箱格式' }
]
const passwordVal = ref('')
const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
const onFormSubmit = (result: boolean) => {
  if (result) {
    const payload = {
      name: nameVal.value,
      password: passwordVal.value
    }
    store
      .dispatch('loginAndFetch', payload)
      .then((data) => {
        createMessage('登录成功 正在跳转首页', 'success', 1000)
        router.push('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
</script>

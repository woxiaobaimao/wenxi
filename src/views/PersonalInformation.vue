<template>个人信息</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import store, { UserProps } from '../store'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 退出登录
const logout = () => {
  store.commit('logout')
  router.push('login')
}
// 编辑资料
</script>

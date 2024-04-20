<template>
  <div class="card mb-3 shadow-sm">
    <div class="p-2">作者榜</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(item, key) in list" :key="key">
        {{ item.nickName }}
      </li>
    </ul>
    <div class="btn">查看更多</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const list = ref([])
const getList = async () => {
  const res = await axios.get('/users/all')
  list.value = res.data
}
onMounted(() => {
  getList()
})
</script>

<template>
  <div class="row">
    <div v-for="column in list" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light my-3" />
          <h5 class="card-name">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="{ name: 'column', params: { id: column._id } }" class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { ColumnProps } from '../store'

defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true
  }
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>

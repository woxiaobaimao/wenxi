<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm" style="cursor: pointer">
      <div @click="router.push(`/posts/${post._id}/`)">
        <div class="card-body">
          <div class="row my-3 align-items-center">
            <div v-if="post.image" class="col-2">
              <img :src="post.image" :alt="post.title" class="rounded-lg w-100" />
            </div>
            <div :class="{ 'col-10': post.image }">
              <h4 class="btn" style="font-weight: bold">{{ post.title }}</h4>
              <p class="text-muted">{{ post.excerpt }}</p>
              <div class="d-flex justify-content-between">
                <span class="btn">中原</span>
                <span class="btn">{{ getFormatData(post.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { PostProps } from '../store'
import { useRouter } from 'vue-router'
import { getFormatData } from '@/hooks/useTime'

const router = useRouter()
const props = defineProps({
  list: {
    required: true,
    type: Array as PropType<PostProps[]>
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
</style>

import { useStore } from 'vuex'
import { ref, computed, ComputedRef } from 'vue'

interface LoadParams {
  page: number
  size: number
}
const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams = { page: 2, size: 5 }) => {
  const store = useStore()
  const page = ref(params.page)
  const requestParams = computed(() => ({
    page: page.value,
    size: params.size
  }))
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      page.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.size) < page.value
  })
  return {
    loadMorePage,
    isLastPage,
    page
  }
}

export default useLoadMore

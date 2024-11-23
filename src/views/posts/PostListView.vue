<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeSelectBox"
    ></PostFilter>
    <hr class="my-4" />
    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />
    <template v-else-if="!isExist">
      <p calass="text-center py-5 text-muted">No result !</p>
    </template>
    <template v-else>
      <AppGrid v-if="posts" :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>

    <hr class="my-5" />
    <AppCard v-if="previewId">
      <PostDetailView :id="previewId"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostModal from '@/components/posts/PostModal.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: '',
});

const isExist = computed(() => {
  return posts.value && posts.value.length > 0;
});

const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { method: 'get', params });

// pagination
const totalCount = computed(
  () => response.value?.headers['x-total-count'] || 0,
);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const selectPreview = id => {
  previewId.value = id;
};
const previewId = ref(null);

const changeSelectBox = limit => {
  params.value._limit = limit;
  params.value._page = 1;
};
const goPage = id => {
  router.push({
    name: 'postDetail',
    params: {
      id: id,
    },
  });
};

//modal
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const show = ref(false);
const openModal = ({ title, content, createdAt }) => {
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
  show.value = true;
};
</script>

<style lang="scss" scoped></style>

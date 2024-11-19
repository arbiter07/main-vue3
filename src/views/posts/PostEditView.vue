<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm
      @submit.prevent="edit"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>
            <span>수정</span>
          </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAleart, vSuccess } = useAlert();

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const { error, loading, data: form } = useAxios(`/posts/${id}`);

const {
  error: editError,
  loading: editLoading,
  execute,
} = useAxios(
  `/posts/${id}`,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('수정이 완료되었습니다.');
      router.push({ name: 'postDetail', params: { id } });
    },
    onError: err => {
      vAleart(err.message);
    },
  },
);

const edit = () => {
  execute({
    ...form.value,
  });
};

const goDetailPage = () => {
  router.push({
    name: 'postDetail',
    params: { id: id },
  });
};

watch(form.value, newValue => {
  console.log(newValue);
});
</script>

<style lang="scss" scoped></style>

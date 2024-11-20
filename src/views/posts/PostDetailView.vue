<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ post?.title }}</h2>
    <p>{{ post?.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post?.createdAt).format('YYYY. MM. DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          @click="remove"
          class="btn btn-outline-danger"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>
            <span>삭제</span>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';

const { vAleart, vSuccess } = useAlert();

const props = defineProps({
  id: [String, Number],
});
const router = useRouter();

const { error, loading, data: post } = useAxios(`/posts/${props.id}`);
const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다.');
      router.push({ name: 'postList' });
    },
    onError: err => {
      vAleart(err.message);
    },
  },
);

const remove = async () => {
  if (confirm('삭제 하시겠습니까?')) {
    execute();
  }
};
const goListPage = () => {
  router.push({
    name: 'postList',
  });
};
const goEditPage = () => {
  router.push({
    name: 'postEdit',
    params: {
      id: props.id,
    },
  });
};
</script>

<style lang="scss" scoped></style>

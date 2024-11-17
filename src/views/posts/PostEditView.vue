<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
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
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
    <AppAlert :items="alerts" />
  </div>
</template>

<script setup>
import { getPostById, udpatePost } from '@/api/posts';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const form = ref({
  title: null,
  content: null,
  createdAt: null,
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    setForm(data);
  } catch (error) {
    console.error('error', error);
    valeart('네트워크오류', 'error');
  }
};
const setForm = ({ title, content, createdAt }) => {
  form.value.title = title;
  form.value.content = content;
  form.value.createdAt = createdAt;
};
fetchPost();

const edit = async () => {
  try {
    await udpatePost(id, { ...form.value });
    valeart('수정이완료되었습니다!!!!!!!!!!!!!!!!!!!', 'success');
    //router.push({ name: 'postDetail', params: { id } });
  } catch (e) {
    console.error('error', e);
    valeart('네트워크오류', 'error');
  }
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

//alert
const alerts = ref([]);
const valeart = (message, type = 'error') => {
  alerts.value.push({ message, type });
  setTimeout(() => {
    alerts.value.shift();
  }, 2000);
};
</script>

<style lang="scss" scoped></style>

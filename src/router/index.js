import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home',
  },
  {
    path: '/about',
    component: AboutView,
  },
  {
    path: '/posts',
    name: 'postList',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'postCreate',
    component: PostCreateView,
  },
  {
    path: '/posts/:id',
    name: 'postDetail',
    component: PostDetailView,
    props: true,
  },
  {
    path: '/posts/:id/edit',
    name: 'postEdit',
    component: PostEditView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    children: [
      {
        path: '',
        name: 'NestedHome',
        component: NestedHomeView,
      },
      {
        path: 'one',
        name: 'NestedOne',
        component: NestedOneView,
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      },
    ],
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage,
    beforeEnter: (to, from) => {
      console.log('to', to);
      console.log('from', from);
      // return false
    },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  //history: createWebHashHistory(),
  routes,
});

//navi guard
// router.beforeEach((to, from) => {
//   console.log(to);
//   console.log(from);
//   if (to.name === 'MyPage') {
//     // return false;
//     return '/posts';
//   }
// });

export default router;

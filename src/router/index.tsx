import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home/index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '' // 自定义对象
        }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // 根据路由配置中的meta.title修改documtent.title
    if (to.meta && to.meta.title) {
        document.title = to.meta.title as string;
    }
    next();
});

export default router;

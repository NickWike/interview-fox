import ProblemContainer from '@/views/ProblemContainer.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', component: ProblemContainer },
        { path: '/problem', component: ProblemContainer }
    ],
});

export default router;

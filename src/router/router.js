import ProblemContainer from '@/views/ProblemContainer.vue';
import MeetingView from '@/views/MeetingView.vue';
import UserMgtView from '@/views/UserMgtView.vue';
import ProblemMgtView from '@/views/ProblemMgtView.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', component: ProblemContainer },
        { path: '/problem', component: ProblemContainer },
        { path: '/meeting', component: MeetingView },
        { path: '/userMgt', component: UserMgtView },
        { path: '/problemMgt', component: ProblemMgtView }
    ],
});

export default router;

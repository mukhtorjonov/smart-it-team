import { createRouter, createMemoryHistory } from "vue-router";

import loginee from '../components/login.vue'
import katigoriya from '../components/katigoryalar.vue'
import katigoriyaEdit from '../components/katigoraiyaEdit.vue'
import mahsulotlar from '../components/mahsulotlar.vue'
import mahsulotQoshish from '../components/mahsulotQoshish.vue'
import mahsulotEdit from '../components/mahsulotEdit.vue'
import katigoriyaQoshish from "../components/katigoriyaQoshish.vue";

const routes = [
    {
        path: "/",
        name: "katigoriya",
        component: katigoriya
    },
    {
        path: "/login",
        name: "login",
        component: loginee
    },
    {
        path: "/katigoriyaEdit",
        name: "katigoriyaEdit",
        component: katigoriyaEdit
    },
    {
        path: "/mahsulotlar",
        name: "mahsulotlar",
        component: mahsulotlar
    },
    {
        path: "/katigoriyaQoshish",
        name: "katigoriyaQoshish",
        component: katigoriyaQoshish
    },
    {
        path: "/mahsulotQoshish",
        name: "mahsulotQoshish",
        component: mahsulotQoshish
    },
    {
        path: "/mahsulotEdit",
        name: "mahsulotEdit",
        component: mahsulotEdit,
        props: true
    },
]
const router = createRouter({
    history: createMemoryHistory(),
    routes
});
export default router
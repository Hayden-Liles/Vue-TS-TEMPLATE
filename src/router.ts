import { createRouter, createWebHashHistory } from 'vue-router'

function loadPage(page: string) {
    return () => import(`./pages/${page}.vue`)
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: loadPage('HomePage')
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
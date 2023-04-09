import {createRouter,createWebHistory} from 'vue-router'

import LoginView from '../views/authentication/LoginView.vue'
import RegistrationView from '../views/authentication/RegistrationView.vue'
import AuthenticationLayout from '../views/layout/AuthenticationLayout.vue'
import UserLayout from '../views/layout/UserLayout.vue'
import UserAccount from '../views/user/UserAccount.vue'
import DashboardView from '../views/user/DashboardView.vue'
import KanbanComponent from '../views/user/KanbanComponent.vue'
import NotesView from '../views/user/NotesView.vue'

const routes =[
    {
        path: '/',
        component: AuthenticationLayout,
        children: [
            {
                path: '',
                component: LoginView
            },
            {
                path: '/register',
                component: RegistrationView
            }
            
        ],
    },
    {
        path: '/user',
        component: UserLayout,
        children: [
            {
                path: '',
                component: UserAccount
            },
            {
                path: '/dashboard',
                component: DashboardView
            },
            {   
                path: '/notes',
                component: NotesView
            },
            {
                path: "/:taskListId",
                component: KanbanComponent
            }
        
        ],
    },
]


export const router = createRouter({routes, history:createWebHistory(), routes})

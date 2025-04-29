
import express from 'express'
import { UserRoutes } from '../modules/User/user.route'

const router = express.Router()

const modulesRoute = [
    {
        path: '/user',
        route: UserRoutes
    },
]


modulesRoute.forEach(route => {
    router.use(route.path, route.route)
})


export default router

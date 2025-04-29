
import express from 'express'
import { UserRoutes } from '../modules/User/user.routes'
import { AuthRouters } from '../modules/Auth/auth.routes'

const router = express.Router()

const modulesRoute = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRouters
    },
]


modulesRoute.forEach(route => {
    router.use(route.path, route.route)
})


export default router

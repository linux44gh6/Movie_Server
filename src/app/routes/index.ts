
import express from 'express'
import { UserRoutes } from '../modules/User/user.routes'
import { AuthRouters } from '../modules/Auth/auth.routes'
import { ContentRouter } from '../modules/Content/content.routes'

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
    {
        path:"/content",
        route:ContentRouter
    }
]


modulesRoute.forEach(route => {
    router.use(route.path, route.route)
})


export default router

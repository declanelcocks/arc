import { Router } from 'express'

import { isAuthenticated } from 'api/middleware'
import post from 'api/post'
import user from 'api/user'

const router = new Router()

router.use(isAuthenticated)
router.use('/posts', post)
router.use('/', user) // includes `/users` and `/auth` endpoints

export default router

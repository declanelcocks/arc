import { Router } from 'express'

import { authGithub, authGithubCallback } from './controller'

const router = new Router()

// router.post('/', signup)
// router.delete('/', requireLogin, remove)
// router.post('/login', login)
router.post('/auth/github', authGithub)
router.get('/auth/github/callback', authGithubCallback)

export User, { schema } from './model'

export default router

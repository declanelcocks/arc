import { Router } from 'express'

import { ensureAuth } from 'api/middleware'

import { currentUser, authGithub, authGithubCallback } from './controller'

const router = new Router()

// router.post('/', signup)
// router.delete('/', requireLogin, remove)
router.get('/users', ensureAuth, currentUser)
router.post('/auth/github', authGithub)
router.get('/auth/github/callback', authGithubCallback)

export User, { schema } from './model'

export default router

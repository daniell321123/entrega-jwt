import { Router } from 'express'

import {
    postSessionsController,
    getCurrentSessionController,
    logoutSessionsController
} from '../../controllers/api/sessions.controller.js'
import { antenticacionPorGithub_CB, autenticacionPorGithub, autenticacionLocal, autenticacionJwtApi } from '../../middlewares/autenticacion.js'
import { afterLoginViewController } from '../../controllers/web/web.controller.js'

export const sessionsRouter = Router()


sessionsRouter.post('/', autenticacionLocal, postSessionsController)


sessionsRouter.get('/github', autenticacionPorGithub)
sessionsRouter.get('/githubcallback',
    antenticacionPorGithub_CB,
    afterLoginViewController 
)

// logout
sessionsRouter.post('/logout', logoutSessionsController)

sessionsRouter.get('/current',
    autenticacionJwtApi, 
    getCurrentSessionController
)
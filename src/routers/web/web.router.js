import { Router } from 'express'
import { homeViewController, loginViewController, registerViewController } from '../../controllers/web/web.controller.js'
import { autenticacionJwtView } from '../../middlewares/autenticacion.js'
import { soloRol } from '../../middlewares/autorizacion.js'

export const webRouter = Router()

webRouter.get('/',

    autenticacionJwtView, 
    homeViewController
)
webRouter.get('/login', loginViewController)
webRouter.get('/register', registerViewController)
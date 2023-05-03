import { Router } from 'express'
import { getUsersController, postUsersController } from '../../controllers/api/users.controller.js'
import { autenticacionJwtApi } from '../../middlewares/autenticacion.js'
import { soloRol } from '../../middlewares/autorizacion.js'

export const usersRouter = Router()

usersRouter.post('/', postUsersController)
usersRouter.get('/', autenticacionJwtApi, soloRol('admin'), getUsersController)

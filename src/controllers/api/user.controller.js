import { User } from '../../entidades/User.js'
import { usersManager } from '../../managers/users.manager.js'
import { encriptarJWT, hashear } from '../../utils/criptografia.js'

export async function postUsersController(req, res, next) {

    const { email, password, first_name, last_name, age, role } = req.body

    const user = new User({
        email,
        password: hashear(password),
        nombre: first_name,
        apellido: last_name,
        edad: age,
        rol: role,
    })

    await usersManager.guardar(user)

    res.cookie('jwt_authorization', encriptarJWT(user), {
        signed: true,
        httpOnly: true
    }) //TODO

    res.status(201).json(user) //TODO
}

export async function getUsersController(req, res, next) {
    const users = await usersManager.obtenerTodos()
    res.json(users)
}
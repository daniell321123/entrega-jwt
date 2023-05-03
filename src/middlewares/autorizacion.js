import { ErrorDePermisos } from '../entidades/errors/ErrorDePermisos.js'



export function soloRol(rol) {
    return function (req, res, next) {
        if (req.user?.rol === rol) return next()
        return next(new ErrorDePermisos(`solo disponible para rol '${rol}'`))
    }
}


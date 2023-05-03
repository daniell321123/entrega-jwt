import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { validarQueSeanIguales } from '../utils/criptografia.js'
import { usersManager } from '../managers/users.manager.js'
import { ErrorDeAutenticacion } from '../entidades/errors/ErrorDeAutenticacion.js'
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { User } from '../entidades/User.js'



import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_PRIVATE_KEY } from '../config/auth.config.js'

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req && req.signedCookies) {
            token = req.signedCookies['jwt_authorization']
        }
        return token
    }]),
    secretOrKey: JWT_PRIVATE_KEY,
}, async (jwt_payload, done) => {
    try {
        done(null, jwt_payload) // payload es el contenido del token, ya descifrado
    } catch (error) {
        done(error)
    }
}))

export function autenticacionJwtApi(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload, info) => {
        if (error || !jwt_payload) return next(new ErrorDeAutenticacion())
        req.user = jwt_payload
        next()
    })(req, res, next)
}

export function autenticacionJwtView(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload) => {
        if (error || !jwt_payload) return res.redirect('/login')
        req.user = jwt_payload
        next()
    })(req, res, next)
}
//TODO hasta acá ---------------------------------------------------------

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const buscado = await usersManager.buscarPorEmail(username)
    if (!buscado)
        return done(new ErrorDeAutenticacion())
    if (!validarQueSeanIguales(password, buscado.password))
        return done(new ErrorDeAutenticacion())
    delete buscado.password
    done(null, buscado)
}))

passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    let user
    try {
        user = await usersManager.buscarPorEmail(profile.username)
    } catch (error) {
        // @ts-ignore
        user = new User({
            email: profile.username,
        })
        await usersManager.guardar(user)
    }
    done(null, user)
}))



export const passportInitialize = passport.initialize()




export const autenticacionLocal = passport.authenticate('local', { session: false, failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { session: false, failWithError: true })


import { encriptarJWT } from '../../utils/criptografia.js'

export function homeViewController(req, res, next) {
    res.render('home', {
        pageTitle: 'Home',
        user: req.user['email'],
    })
}

export function loginViewController(req, res, next) {
    res.render('login', {
        pageTitle: 'Login'
    })
}

export function registerViewController(req, res, next) {
    res.render('register', {
        pageTitle: 'Register'
    })
}

export function afterLoginViewController(req, res, next) {
    res.cookie('jwt_authorization', encriptarJWT(req.user), { signed: true, httpOnly: true })
    res.redirect('/')
}
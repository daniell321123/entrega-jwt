import express from 'express'
// import session from 'express-session' //TODO
import { manejoDeErrores } from './middlewares/manejoDeErroresRest.js'
import {
    passportInitialize,
    // passportSession //TODO
} from './middlewares/autenticacion.js'
import { engine } from 'express-handlebars'
import { apiRouter } from './routers/api/api.router.js'
import { PORT } from './config/server.config.js'
import { webRouter } from './routers/web/web.router.js'
import cookieParser from 'cookie-parser'
import { COOKIE_SECRET } from './config/auth.config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cookieParser(COOKIE_SECRET)) //TODO

// app.use(session({ //TODO
//     secret: '5ecr3t0',
//     resave: false,
//     saveUninitialized: false
// }))

app.engine('handlebars', engine())
app.set('views', `./views`)
app.set('view engine', 'handlebars')

// acá cargo passport en el servidor express como middleware
app.use(passportInitialize)
// app.use(passportSession) //TODO

app.use('/', webRouter)
app.use('/api', apiRouter)

app.use(manejoDeErrores)

app.listen(PORT, () => { console.log(`escuchando en ${PORT}!`) })
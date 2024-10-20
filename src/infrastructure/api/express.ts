import express, { Express } from 'express'
import { moviesRouter } from './routes/movies.routes'

const app: Express = express()
app.use(express.json())
app.use("/movies", moviesRouter)

export { app }
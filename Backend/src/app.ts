import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import userRoutes from "./routes/users"
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"

const app = express()

app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Hello, World!")
// })
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))

app.use("/api/users", userRoutes)

//error Handler
//if no route is found:
app.use((req, res, next) => {
    next(Error("Endpoint not found!"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = " An Uunknown errer occurred"
    if (error instanceof Error) 
        errorMessage = error.message
    res.status(500).json({error: errorMessage})
})

export default app
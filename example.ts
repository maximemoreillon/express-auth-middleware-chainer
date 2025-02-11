import express, { NextFunction, Response, Request } from "express"
import { authMiddlewareChainer } from "./"
const app = express()

const middlewareFactory = () => {
  console.log("middleware1 initialized")
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware1")
    next()
  }
}

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
  console.log("middleware2")
  res.locals.user = {
    id: "123",
  }
  next()
}

const middleware3 = (req: Request, res: Response, next: NextFunction) => {
  console.log("middleware3")
  next()
}

const asyncMiddlewareFactory = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("Async middleware")
    const response = await fetch("https://maximemoreillon.com")
    const data = await response.text()
    console.log(data)
    next()
  }
}

const middlewareChain = authMiddlewareChainer([
  middlewareFactory(),
  asyncMiddlewareFactory(),
  middleware2,
  middleware3,
])

app.use(middlewareChain)

app.get("/", (req, res) => {
  res.send({ user: res.locals })
})

app.listen(7070, () => {
  console.log("App listening")
})

# Express middleware chainer

## Usage example

```ts
import express, { NextFunction, Response, Request } from "express"
import { authMiddlewareChainer } from "@moreillon/express-auth-middleware-chainer"
const app = express()

const middleware1Factory = () => {
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

const middlewareChain = authMiddlewareChainer([
  middleware1Factory(),
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
```

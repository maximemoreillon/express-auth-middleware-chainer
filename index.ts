import { NextFunction, Response, Request, RequestHandler } from "express"

export const authMiddlewareChainer = (middlewares: RequestHandler[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const middleware of middlewares) {
      // Not passing the next function to individual middlewares
      middleware(req, res, () => {})
      if (res.locals.user) return next()
    }
    if (!res.locals.user) throw "User identification failed"
  }
}

import { NextFunction, Response, Request, RequestHandler } from "express"

export const authMiddlewareChainer = (middlewares: RequestHandler[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const middleware of middlewares) {
      // Not passing the next function to individual middlewares
      try {
        await middleware(req, res, () => {})
        if (res.locals.user) return next()
      } catch (error) {
        // Skip on error
      }
    }
    if (!res.locals.user) res.status(401).send("Unauthorized")
  }
}

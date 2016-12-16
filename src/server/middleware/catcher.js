import logger from 'debug'

/**
 * Middleware for catching errors thrown in routes
 * @param ctx
 * @returns {function}
 */
export default async function(ctx, next) {
    try {
        await next()
    } catch(error) {
        // TypeErrors are generated by our app (ex: Wrong login)
        // So we don't need to log the whole stacktrace
        logger('app:error')(error instanceof TypeError ? error.message : error)

        if (process.env.DEV) {
            return ctx.throw(400, error.toString())
        }
    }
}

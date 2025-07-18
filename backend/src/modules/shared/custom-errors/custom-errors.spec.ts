import { describe, it, expect } from "vitest"
import { BaseHTTPError } from "./base-http-error"
import { BadRequestError } from "./bad-request-error"
import { UnauthorizedError } from "./unauthorized-error"
import { NotFoundError } from "./not-found-error"
import { InternalServerError } from "./internal-server-error"

describe("Custom errors", (): void => {
    it("Should correctly instantiate BaseHTTPError", (): void => {
        const message = "Unfortunately, the server is down"
        const statusCode = 500

        const error = new BaseHTTPError(message, statusCode)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(statusCode)
        expect(error.name).toBe("BaseHTTPError")
    })

    it("Should correctly instantiate BadRequestError", (): void => {
        const message = "Unfortunately, the request failed because the 'email' field is missing."

        const error = new BadRequestError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(400)
        expect(error.name).toBe("BadRequestError")
    })

    it("Should correctly instantiate UnauthorizedError", (): void => {
        const message = "Unfortunately, your credentials are expired"

        const error = new UnauthorizedError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(401)
        expect(error.name).toBe("UnauthorizedError")
    })

    it("Should correctly instantiate NotFoundError", (): void => {
        const message = "Unfortunately, the monitor wasn't found"

        const error = new NotFoundError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(404)
        expect(error.name).toBe("NotFoundError")
    })

    it("Should correctly instantiate InternalServerError", (): void => {
        const message = "Unfortunately, the server is down"

        const error = new InternalServerError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(500)
        expect(error.name).toBe("InternalServerError")
    })
})
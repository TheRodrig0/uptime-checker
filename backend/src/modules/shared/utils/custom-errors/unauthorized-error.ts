import { BaseHTTPError } from "./base-http-error"

export class UnauthorizedError extends BaseHTTPError {
    constructor(message: string) {
        super(message, 401)
    }
}
import { BaseHTTPError } from "./base-http-error"

export class BadRequestError extends BaseHTTPError {
    constructor(message: string) {
        super(message, 400)
    }
}
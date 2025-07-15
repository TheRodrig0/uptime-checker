import { BaseHTTPError } from "./base-http-error"

export class NotFoundError extends BaseHTTPError {
    constructor(message: string) {
        super(message, 404)
    }
}
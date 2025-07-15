import { BaseHTTPError } from "./base-http-error"

export class InternalServerError extends BaseHTTPError {
    constructor(message: string) {
        super(message, 500)
    }
}
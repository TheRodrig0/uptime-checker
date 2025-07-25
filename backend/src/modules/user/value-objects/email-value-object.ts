import { BadRequestError } from "../../shared/custom-errors/bad-request-error"
import { BaseValueObject } from "../../shared/value-objects/base-value-object"

export class Email extends BaseValueObject<string> {
    private static readonly minimumLength: number = 8
    private static readonly maximumLength: number = 254

    protected validate(value: string): void {
        this.validateFormat(value)
        this.validateLength(value)
    }

    private validateFormat(value: string): void {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailRegex.test(value)) {
            throw new BadRequestError(`The email format '${value}' is invalid.`)
        }
    }

    private validateLength(value: string): void {
        const isValidLength = value.length >= Email.minimumLength && value.length <= Email.maximumLength

        if (!isValidLength) {
            throw new BadRequestError(`The email must be between ${Email.minimumLength} and ${Email.maximumLength} characters long.`)
        }
    }
}

import { BadRequestError } from "../../shared/custom-errors/bad-request-error"
import { BaseValueObject } from "../../shared/value-objects/base-value-object"

export class Name extends BaseValueObject<string> {
    private static readonly minimumLength: number = 3
    private static readonly maximumLength: number = 25

    protected validate(value: string): void {
        this.validateWithRegex(value)
        this.validateLength(value)
    }

    private validateWithRegex(value: string) {
        const nameRegex = /^(?!.*\p{Extended_Pictographic})[\p{L}\p{N}\s.,!?'"-]+$/u

        if (!nameRegex.test(value)) {
            throw new BadRequestError("Invalid name. It may contain invalid characters or emojis.")
        }
    }

    private validateLength(value: string) {
        const isValidLength = value.length >= Name.minimumLength && value.length <= Name.maximumLength

        if (!isValidLength) {
            throw new BadRequestError(`Invalid name length, name isn't between ${Name.minimumLength} and ${Name.maximumLength} in length`)
        }
    }
}
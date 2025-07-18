import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/custom-errors/bad-request-error"

export class Title extends BaseValueObject<string> {
    private static readonly minimumLength: number = 5
    private static readonly maximumLength: number = 10

    protected validate(value: string): void {
        this.validateWithRegex(value)
        this.validateLength(value)
    }

    private validateWithRegex(value: string) {
        const titleRegex = /^(?!.*\p{Extended_Pictographic})[\p{L}\p{N}\s.,!?'"-]+$/u

        if (!titleRegex.test(value)) {
            throw new BadRequestError("Invalid title. It may contain invalid characters or emojis.")
        }
    }

    private validateLength(value: string) {
        const isValidLength = value.length >= Title.minimumLength && value.length <= Title.maximumLength

        if (!isValidLength) {
            throw new BadRequestError(`Invalid title length, title isn't between ${Title.minimumLength} and ${Title.maximumLength} in length`)
        }
    }
}
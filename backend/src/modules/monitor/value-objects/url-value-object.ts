import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/utils/custom-errors/bad-request-error"

export class Url extends BaseValueObject<string> {
    protected validate(value: string): void {
        try {
            new URL(value)
        } catch (error) {
            throw new BadRequestError(`Invalid URL: ${value}`)
        }
    }
}
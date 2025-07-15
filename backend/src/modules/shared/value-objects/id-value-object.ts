import { BadRequestError } from "../custom-errors/bad-request-error"
import { BaseValueObject } from "./base-value-object"

export class ID extends BaseValueObject<string> {
    private readonly length: number = 36

    protected validate(value: string): void {
        this.validateWithRegex(value)
    }

    private validateWithRegex(value: string): void {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

        if (!uuidRegex.test(value)) {
            throw new BadRequestError("The ID must be a valid UUID.")
        }
    }
}
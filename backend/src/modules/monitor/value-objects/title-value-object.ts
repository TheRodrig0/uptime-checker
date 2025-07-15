import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/utils/custom-errors/bad-request-error"

export class Title extends BaseValueObject<string> {
    private readonly minimumLength: number = 5
    private readonly maximumLength: number = 10
    
    protected validate(value: string): void {
        this.validateLength(value)
    }

    private validateLength(value: string) {
        const isValidLength = value.length >= this.minimumLength && value.length <= this.maximumLength

        if(!isValidLength){
            throw new BadRequestError("")
        }
    }
}
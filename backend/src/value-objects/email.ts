import { BaseObjectValue } from "./base-object-value"

export class Email extends BaseObjectValue<string> {
    private readonly minimalLength = 10
    private readonly maximalLength = 100

    constructor(value: string) {
        super(value.trim())
        this.validate(this.value)
    }

    protected validate(value: string): void {
        this.validateWithRegex(value)
        this.validateWithLength(value)
    }

    private validateWithLength(email: string): void {
        const isValidLength = email.length >= this.minimalLength &&
            email.length <= this.maximalLength

        if (!isValidLength) {
            throw new Error(`Email length must be between ${this.minimalLength} and ${this.maximalLength} characters`)
        }
    }

    private validateWithRegex(email: string): void {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const isValidEmail = emailRegex.test(email)

        if (!isValidEmail) {
            throw new Error(`Invalid email format`)
        }
    }

    toString(): string {
        return this.getValue()
    }

}
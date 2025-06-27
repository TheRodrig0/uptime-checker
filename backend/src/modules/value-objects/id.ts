import { BaseObjectValue } from "./base-object-value"

export class ID extends BaseObjectValue<string> {
    private readonly length = 10

    constructor(value: string) {
        super(value.trim())
        this.validate(this.value)
    }

    protected validate(value: string): void {
        this.validateWithLength(value)
        this.validateWithRegex(value)
    }

    protected validateWithLength(id: string): void {
        const isValidLength = id.length === this.length

        if (!isValidLength) {
            throw new RangeError(`ID length must be exactly ${this.length} characters`)
        }
    }

    protected validateWithRegex(id: string): void {
        const idRegex = /^[a-z0-9_-]+$/
        
        const isValidId = idRegex.test(id)

        if (!isValidId) {
            throw new Error(`Invalid ID format`)
        }
    }
}
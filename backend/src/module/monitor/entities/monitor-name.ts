import { BaseObjectValue } from "../../value-objects/base-object-value"

export class MonitorName extends BaseObjectValue<string> {
    private readonly minimalLength = 3
    private readonly maximalLength = 50

    constructor(name: string) {
        super(name.trim())
        this.validate(this.value)
    }

    protected validate(name: string): void {
        this.validateWithLength(name)
        this.validateWithRegex(name)
    }

    protected validateWithLength(name: string): void {
        const isValidLength = name.length >= this.minimalLength && name.length <= this.maximalLength

        if (!isValidLength) {
            throw new RangeError(`Monitor name length must be between ${this.minimalLength} and ${this.maximalLength} characters`)
        }
    }

    protected validateWithRegex(name: string): void {
        const nameRegex = /^[a-zA-Z0-9\s_-]+$/
        const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

        const isValidName = nameRegex.test(name) && !emojiRegex.test(name)

        if (!isValidName) {
            throw new Error(`Invalid monitor name format. Only alphanumeric characters, underscores, hyphens, and spaces are allowed.`)
        }
    }
}
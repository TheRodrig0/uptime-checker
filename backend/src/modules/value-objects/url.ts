import { BaseObjectValue } from "./base-object-value"

export class Url extends BaseObjectValue<string> {
    private readonly minimalLength = 10
    private readonly maximalLength = 255

    constructor(url: string) {
        super(url.trim())
        this.validate(this.value)
    }

    protected validate(url: string): void {
        this.validateWithLength(url)
        this.validateWithRegex(url)
    }

    protected validateWithLength(url: string): void {
        const isValidLength = url.length >= this.minimalLength && url.length <= this.maximalLength

        if (!isValidLength) {
            throw new RangeError(`URL length must be between ${this.minimalLength} and ${this.maximalLength} characters`)
        }
    }

    protected validateWithRegex(url: string): void {
        const urlRegex = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:\d+)?([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i
        
        const isValidUrl = urlRegex.test(url)

        if (!isValidUrl) {
            throw new Error(`Invalid URL format`)
        }
    }

}
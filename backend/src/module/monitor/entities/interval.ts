import { BaseObjectValue } from "../../value-objects/base-object-value"

export class Interval extends BaseObjectValue<number> {
    private readonly minimalLength = 30
    private readonly maximalLength = 100
    constructor(interval: number) { 
        super(interval)
        this.validate(this.value)
    }

    protected validate(interval: number): void {
        this.validate(interval)
    }

    protected validateWithLength(interval: number): void {
        const isValidLength = interval >= this.minimalLength && interval <= this.maximalLength

        if(!isValidLength){
            throw new RangeError("Invalid interval length")
        }
    }
}
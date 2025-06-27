import { BaseObjectValue } from "../../value-objects/base-object-value"

export class Status extends BaseObjectValue<string> {
    private readonly ALLOWED_STATUSES: string[] = ["up", "down", "unknown"]
    constructor(value: string) {
        super(value)
        this.validate(value)
    }

    protected validate(value: string): void {
        if (!this.ALLOWED_STATUSES.includes(value)) {
            throw new Error(
                `Invalid status: "${value}". Allowed values are: ${this.ALLOWED_STATUSES.join(", ")}`
            )
        }
    }
}
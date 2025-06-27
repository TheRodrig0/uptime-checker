export abstract class BaseObjectValue<T> {
    protected readonly value: T

    constructor(value: T) {
        this.value = value
    }

    protected abstract validate(value: T): void
    protected validateWithLength(value: string | number): void {}
    protected validateWithRegex(value: string): void {}

    getValue(): T {
        return this.value
    }

    toString(): string {
        if (typeof this.value === 'string') {
            return this.value
        }

        return JSON.stringify(this.value)
    }
}
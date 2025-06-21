export abstract class BaseObjectValue<T> {
    protected readonly value: T

    constructor(value: T) {
        this.value = value
    }

    protected abstract validate(value: T): void

    getValue(): T {
        return this.value
    }

    toString(): string {
        return JSON.stringify(this.value)
    }
}
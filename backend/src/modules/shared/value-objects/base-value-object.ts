export abstract class BaseValueObject<ValueType> {
    constructor(protected readonly value: ValueType) {
        this.validate(value)
    }

    protected abstract validate(value: ValueType): void

    getValue(): ValueType {
        return this.value
    }
}
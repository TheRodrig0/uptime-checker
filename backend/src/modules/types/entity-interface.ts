export interface EntityInterface<T> {
    getProps(): Partial<T>
    toJSON(): T
}
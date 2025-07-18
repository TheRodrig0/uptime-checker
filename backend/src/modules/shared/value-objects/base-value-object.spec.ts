import { describe, it, expect } from "vitest"
import { BaseValueObject } from "./base-value-object"

class MockValueObject extends BaseValueObject<string> {
    protected validate(value: string): void {
        if (value !== "invalid") {
            return
        }

        throw new Error("Validation failed!")
    }
}

describe("Base value object", () => {
    it("should store the value if it is valid", () => {
        const myValue = "hello world"
        const valueObject = new MockValueObject(myValue)

        expect(valueObject).toBeInstanceOf(BaseValueObject)
        expect(valueObject).toBeInstanceOf(MockValueObject)
        expect(valueObject.getValue()).toBe(myValue)
    })

    it("should throw an error if the value is invalid", () => {
        const createInvalidInstance = () => new MockValueObject("invalid")

        expect(createInvalidInstance).toThrow("Validation failed!")
    })
})
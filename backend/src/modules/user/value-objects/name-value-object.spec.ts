import { describe, it, expect } from "vitest"
import { Name } from "./name-value-object"
import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/custom-errors/bad-request-error"

describe("Name value object", (): void => {
    it("Should correctly create a Name instance for a valid name", (): void => {
        const validName = "John Doe"
        const name = new Name(validName)

        expect(name).toBeInstanceOf(BaseValueObject)
        expect(name).toBeInstanceOf(Name)
        expect(name.getValue()).toBe(validName)
    })

    it.each([
        { name: "Jo", reason: "too short" },
        { name: "This name is definitely way too long to be valid", reason: "too long" },
    ])(
        "Should throw a BadRequestError for a name that is $reason",
        ({ name }): void => {
            const createInvalidName = () => new Name(name)

            expect(createInvalidName).toThrow(BadRequestError)
            expect(createInvalidName).toThrow("Invalid name length, name isn't between 3 and 25 in length")
        }
    )

    it.each([
        { name: "User_123$", reason: "it contains invalid characters" },
        { name: "Hacker 👨‍💻", reason: "it contains an emoji" },
    ])(
        "Should throw a BadRequestError because the name $reason",
        ({ name }): void => {
            const createInvalidName = () => new Name(name)

            expect(createInvalidName).toThrow(BadRequestError)
            expect(createInvalidName).toThrow("Invalid name. It may contain invalid characters or emojis.")
        }
    )
})
import { describe, it, expect } from "vitest"
import { Email } from "./email-value-object"
import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/custom-errors/bad-request-error"

describe("Email value object", (): void => {
    it("Should correctly create an Email instance for a valid email", (): void => {
        const emailValue = "rodrigo_jeronimo@domain.com"
        const email = new Email(emailValue)

        expect(email).toBeInstanceOf(BaseValueObject)
        expect(email).toBeInstanceOf(Email)
        expect(email.getValue()).toBe(emailValue)
    })

    it("Should throw a BadRequestError for an invalid email format", (): void => {
        const invalidEmail = "invalid-email"
        const createInvalidEmail = () => new Email(invalidEmail)

        expect(createInvalidEmail).toThrow(BadRequestError)
        expect(createInvalidEmail).toThrow(`The email format '${invalidEmail}' is invalid.`)
    })

    it.each([
        { email: "a@b.io", reason: "too short" },
        { email: `${"a".repeat(245)}@domain.com`, reason: "too long" },
    ])(
        "Should throw a BadRequestError for an email that is $reason",
        ({ email }): void => {
            const createInvalidEmail = () => new Email(email)

            expect(createInvalidEmail).toThrow(BadRequestError)
            expect(createInvalidEmail).toThrow("The email must be between 8 and 254 characters long.")
        }
    )
})
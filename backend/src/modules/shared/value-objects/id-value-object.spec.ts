import { describe, it, expect } from "vitest"
import { ID } from "./id-value-object"
import { BaseValueObject } from "./base-value-object"
import { BadRequestError } from "../../shared/custom-errors/bad-request-error"

describe("ID Value Object", () => {
    it("Should correctly create an ID instance for a valid UUID", (): void => {
        const idValue = "123e4567-e89b-12d3-a456-426614174000"
        const id = new ID(idValue)

        expect(id).toBeInstanceOf(BaseValueObject)
        expect(id).toBeInstanceOf(ID)
        expect(id.getValue()).toBe(idValue)
    })

    it("Should throw a BadRequestError for an invalid ID", (): void => {
        const invalidValue = "6578ab_fe412kl mno 4265 stu23yz"
        const createInvalidId = () => new ID(invalidValue)

        expect(createInvalidId).toThrow(BadRequestError)
        expect(createInvalidId).toThrow("The ID must be a valid UUID.")
    })
})
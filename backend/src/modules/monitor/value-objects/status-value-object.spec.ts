import { describe, it, expect } from "vitest"
import { Status } from "./status-value-object"
import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/custom-errors/bad-request-error"

describe("Status object value", (): void => {
    it.each([
        { statusValue: "up" },
        { statusValue: "down" },
        { statusValue: "unknown" },
    ])(
        "Should correctly create a Status instance for a valid status $statusValue",
        ({ statusValue }): void => {
            const status = new Status(statusValue)

            expect(status).toBeInstanceOf(BaseValueObject)
            expect(status).toBeInstanceOf(Status)
            expect(status.getValue()).toBe(statusValue)
        }
    )

    it("Should throw a BadRequestError for an invalid status", (): void => {
        const invalidStatus = "invalidValue"
        const createInvalidStatus = () => new Status(invalidStatus)

        expect(createInvalidStatus).toThrow(BadRequestError)
        expect(createInvalidStatus).toThrow(`Invalid status "${invalidStatus}". Accepted values are: up, down, unknown.`)

    })
})
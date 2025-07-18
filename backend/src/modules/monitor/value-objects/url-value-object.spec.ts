import { describe, it, expect } from "vitest"
import { Url } from "./url-value-object"
import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/custom-errors/bad-request-error"

describe("Url Value Object", () => {
    it.each([
        { url: "http://localhost:3000/path" },
        { url: "https://github.com/TheRodrig0/uptime-checker" },
    ])("Should correctly create a Url instance for a valid URL: '$url'", ({ url }) => {
        const urlInstance = new Url(url)

        expect(urlInstance).toBeInstanceOf(BaseValueObject)
        expect(urlInstance).toBeInstanceOf(Url)
        expect(urlInstance.getValue()).toBe(url)
    })

    it("Should throw a BadRequestError for an invalid URL: '$url'", (): void => {
        const urlValue = "invalidUrl"
        const createInvalidUrl = () => new Url(urlValue)

        expect(createInvalidUrl).toThrow(BadRequestError)
        expect(createInvalidUrl).toThrow(`Invalid URL: ${urlValue}`)
    })
})
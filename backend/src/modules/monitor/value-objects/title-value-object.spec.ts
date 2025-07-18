import { describe, it, expect } from "vitest"
import { Title } from "./title-value-object"
import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/custom-errors/bad-request-error"

describe("Title Value Object", (): void => {
    it("Should correctly create a Title instance for a valid title", (): void => {
        const validTitle = "My-Site"
        const title = new Title(validTitle)

        expect(title).toBeInstanceOf(BaseValueObject)
        expect(title).toBeInstanceOf(Title)
        expect(title.getValue()).toBe(validTitle)
    })

    it.each([
        { title: "shrt", reason: "too short" },
        { title: "this title is way too long", reason: "too long" },
    ])(
        "Should throw a BadRequestError for a title that is $reason",
        ({ title }): void => {
            const createInvalidTitle = () => new Title(title)

            expect(createInvalidTitle).toThrow(BadRequestError)
            expect(createInvalidTitle).toThrow("Invalid title length, title isn't between 5 and 10 in length")
        }
    )

    it.each([
        { title: "😎I'm cool", reason: "it contains an emoji" },
        { title: "_=+~^", reason: "it contains invalid characters" },
    ])(
        "Should throw a BadRequestError because the title $reason",
        ({ title }): void => {
            const createInvalidTitle = () => new Title(title)

            expect(createInvalidTitle).toThrow(BadRequestError)
            expect(createInvalidTitle).toThrow("Invalid title. It may contain invalid characters or emojis.")
        }
    )
})
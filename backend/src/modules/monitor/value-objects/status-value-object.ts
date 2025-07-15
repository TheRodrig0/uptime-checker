import { BaseValueObject } from "../../shared/value-objects/base-value-object"
import { BadRequestError } from "../../shared/utils/custom-errors/bad-request-error"

const statusEnum = {
  UP: 'up',
  DOWN: 'down',
  UNKNOWN: 'unknown'
} as const

type StatusValue = typeof statusEnum[keyof typeof statusEnum]

export class Status extends BaseValueObject<string> {
  protected validate(value: string): void {
    const validStatuses = Object.values(statusEnum)

    if (!validStatuses.includes(value as StatusValue)) {
      throw new BadRequestError(`Invalid status "${value}". Accepted values are: ${validStatuses.join(', ')}.`)
    }
  }
}
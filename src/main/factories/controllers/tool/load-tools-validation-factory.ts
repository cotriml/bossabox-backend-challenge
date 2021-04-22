
import { MaxPageSizeValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeLoadToolsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new MaxPageSizeValidation('pageSize'))

  return new ValidationComposite(validations)
}

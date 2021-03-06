
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddToolValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'link', 'description', 'tags']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}

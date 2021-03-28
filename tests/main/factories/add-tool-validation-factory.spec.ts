import { makeAddToolValidation } from '@/main/factories'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddToolValidation()
    const validations: Validation[] = []
    for (const field of ['title', 'link', 'description', 'tags']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

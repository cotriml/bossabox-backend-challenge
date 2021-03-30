import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, created, serverError } from '@/presentation/helpers'
import { AddUser } from '@/domain/usecases'
import { EmailInUseError } from '@/presentation/errors'

export class AddUserController implements Controller {
  constructor (
    private readonly addUser: AddUser,
    private readonly validation: Validation
  ) { }

  async handle (request: AddUserController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, role, email, password } = request
      const isValid = await this.addUser.add({
        name,
        role,
        email,
        password
      })

      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddUserController {
  export type Request = {
    name: string
    role: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

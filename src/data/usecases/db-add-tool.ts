import { AddToolRepository } from '@/data/protocols'
import { AddTool } from '@/domain/usecases'

export class DbAddTool implements AddTool {
  constructor (
    private readonly addToolRepository: AddToolRepository
  ) { }

  async add (toolData: AddTool.Params): Promise<AddTool.Result> {
    const tool = await this.addToolRepository.add(toolData)
    return tool
  }
}

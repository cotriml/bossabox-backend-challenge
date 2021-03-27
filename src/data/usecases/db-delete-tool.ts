import { DeleteToolRepository } from '@/data/protocols'
import { DeleteTool } from '@/domain/usecases'

export class DbDeleteTool implements DeleteTool {
  constructor (
    private readonly deleteToolRepository: DeleteToolRepository
  ) { }

  async delete (toolId: string): Promise<DeleteTool.Result> {
    const isDeleted = await this.deleteToolRepository.delete(toolId)
    return isDeleted
  }
}

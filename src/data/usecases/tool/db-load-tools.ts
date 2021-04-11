import { LoadToolsRepository } from '@/data/protocols'
import { PaginationModel } from '@/domain/models'
import { LoadTools } from '@/domain/usecases'

export class DbLoadTools implements LoadTools {
  constructor (private readonly loadToolsRepository: LoadToolsRepository) { }

  async load (tag?: string, pagination?: PaginationModel): Promise<LoadTools.Result> {
    const tools = await this.loadToolsRepository.loadAll(tag, pagination)
    return tools
  }
}

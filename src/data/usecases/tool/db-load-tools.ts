import { LoadToolsRepository } from '@/data/protocols'
import { LoadTools } from '@/domain/usecases'

export class DbLoadTools implements LoadTools {
  constructor (private readonly loadToolsRepository: LoadToolsRepository) { }

  async load (tag?: string): Promise<LoadTools.Result> {
    const tools = await this.loadToolsRepository.loadAll(tag)
    return tools
  }
}

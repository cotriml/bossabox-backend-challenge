export const metadataSchema = {
  type: 'object',
  properties: {
    totalRecords: {
      type: 'integer'
    },
    totalFiltered: {
      type: 'integer'
    },
    currentPage: {
      type: 'integer'
    },
    pageSize: {
      type: 'integer'
    }
  }
}

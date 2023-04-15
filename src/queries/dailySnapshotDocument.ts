import { graphql } from '../gql'

// Jan 1st 2023 epock timestamp: 1672531200
const dailySnapshotDocument = graphql(/* GraphQL */ `
  query DailySnapshot {
    dailySnapshots(first: 1000, orderDirection: asc) {
      id
      totalAssets
    }
  }
`)

export default dailySnapshotDocument

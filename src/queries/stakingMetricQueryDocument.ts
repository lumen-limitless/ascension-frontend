import { graphql } from '../gql'

// Jan 1st 2023 epock timestamp: 1672531200
const stakingDailySnapshotDocument = graphql(/* GraphQL */ `
  query StakingMetric {
    dailySnapshots(first: 1000, orderDirection: asc) {
      id
      date
      totalAssets
    }
  }
`)

export default stakingDailySnapshotDocument

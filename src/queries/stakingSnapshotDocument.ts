import { graphql } from '../gql'

// Jan 1st 2023 epock timestamp: 1672531200
const stakingSnapshotDocument = graphql(/* GraphQL */ `
  query StakingSnapshot {
    stakingSnapshots(first: 1000, orderDirection: asc) {
      id
      totalSupply
      totalAssets
    }
  }
`)

export default stakingSnapshotDocument

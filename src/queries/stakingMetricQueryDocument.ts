import { graphql } from '../gql'

// Jan 1st 2023 epock timestamp: 1672531200
const stakingMetricQueryDocument = graphql(/* GraphQL */ `
  query StakingMetric {
    stakingMetrics(
      first: 1000
      orderDirection: asc
      where: { id_gt: 1672531200 }
    ) {
      id
      totalStaked
    }
  }
`)

export default stakingMetricQueryDocument

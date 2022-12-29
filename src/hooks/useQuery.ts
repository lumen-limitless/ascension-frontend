import request from 'graphql-request'
import useSWR from 'swr'

export function useQuery(endpoint: string, query: string, variables?: any) {
  return useSWR(
    [endpoint, query, variables],
    ([endpoint, query, variables]) => {
      return request(endpoint, query, variables)
    }
  )
}

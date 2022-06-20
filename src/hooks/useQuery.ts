import request from 'graphql-request'
import useSWR from 'swr'

export function useQuery(endpoint: string, query: string, variables: any) {
  return useSWR([query, variables], (query, variables) => {
    return request(endpoint, query, variables)
  })
}

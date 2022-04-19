import React from 'react'
import { formatBalance } from '../../functions'
import Button from '../Button'
import ExternalLink from '../ExternalLink'

export default function BuyAscend({ amount }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>This tool requires {formatBalance(amount)} ASCEND</h1>
      <ExternalLink href="https://app.sushi.com/swap?&outputCurrency=0x9e724698051da34994f281bd81c3e7372d1960ae">
        <Button color="gradient">Buy Now</Button>
      </ExternalLink>
    </div>
  )
}

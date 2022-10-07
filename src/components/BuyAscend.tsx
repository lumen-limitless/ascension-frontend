import React from 'react'
import { formatBalance } from '../functions'
import Button from './ui/Button'
import Card from './ui/Card'
import ExternalLink from './ui/ExternalLink'

export default function BuyAscend({ amount }) {
  return (
    <Card>
      <div className="flex flex-col gap-9 text-center">
        <p className="text-xl">
          This tool requires {formatBalance(amount)} ASCEND
        </p>
        <ExternalLink
          href="https://app.sushi.com/swap?&outputCurrency=0x9e724698051da34994f281bd81c3e7372d1960ae"
          className=""
        >
          <Button color="gradient">Buy Now</Button>
        </ExternalLink>
      </div>
    </Card>
  )
}

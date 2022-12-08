import React from 'react'
import { formatBalance } from '../functions'
import Button from './ui/Button'
import Card from './ui/Card'
import Logo from './ui/Logo'
import ExternalLink from './ui/ExternalLink'

export default function BuyAscend({ amount }) {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-center gap-1">
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>{' '}
          <h1 className="text-center text-xl">Insufficient ASCEND Balance</h1>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col items-center gap-3">
          <p className="bg-dark-900/30 border-l-2 border-yellow p-3 ">
            You must hold at least <b>{formatBalance(amount)} ASCEND</b> to use
            this tool. These balance requirements increase the value of ASCEND
            by creating a utility use case for the protocol. Click the link
            below to join the Ascension!
          </p>
          <ExternalLink href="https://app.sushi.com/swap?&outputCurrency=0x9e724698051da34994f281bd81c3e7372d1960ae">
            <Button full color="gray">
              <Logo />
              Purchase ASCEND
            </Button>
          </ExternalLink>
        </div>
      </Card.Body>
    </Card>
  )
}

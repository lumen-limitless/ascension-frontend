import { DownloadIcon } from '@heroicons/react/outline'
import { useEthers } from '@usedapp/core'
import { NextPage } from 'next'
import Button from '../../../components/Button'
import BuyAscend from '../../../components/BuyAscend'
import Card from '../../../components/Card'
import Container from '../../../components/Container'
import { useRequiredBalance } from '../../../hooks/useRequiredBalance'

const MempoolSniperPage: NextPage = () => {
  const { account } = useEthers()
  const pass = useRequiredBalance(account, 80000)
  if (!pass) return <BuyAscend amount={80000} />
  return (
    <Container maxWidth="xl">
      <Card>
        <div className="flex flex-col items-center justify-center gap-9">
          <svg
            width="128"
            height="128"
            viewBox="0 0 238 238"
            className="fill-current text-red"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M119 219C174.228 219 219 174.228 219 119C219 63.7715 174.228 19 119 19C63.7715 19 19 63.7715 19 119C19 174.228 63.7715 219 119 219ZM119 210.795C168.706 210.795 209 169.467 209 118.487C209 67.507 168.706 26.1795 119 26.1795C69.2944 26.1795 29 67.507 29 118.487C29 169.467 69.2944 210.795 119 210.795Z"
            />
            <rect x="115" width="9" height="38" />
            <rect x="38" y="115" width="9" height="38" transform="rotate(90 38 115)" />
            <rect x="238" y="115" width="9" height="38" transform="rotate(90 238 115)" />
            <rect x="111" y="200" width="9" height="38" />
          </svg>

          <a href="/files/archive.zip" download>
            <Button variant="filled" color="green">
              <DownloadIcon height={32} width={32} />
              Download mempool sniper
            </Button>
          </a>
        </div>
      </Card>
    </Container>
  )
}

export default MempoolSniperPage

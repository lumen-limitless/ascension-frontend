import Loader from './ui/Loader'

export default function UnsupportedChainId({
  supportedChainIds,
}: {
  supportedChainIds: number[]
}) {
  return (
    <>
      <Loader /> <span>Please connect to a supported network</span>
    </>
  )
}

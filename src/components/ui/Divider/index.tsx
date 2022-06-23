import { VFC } from 'react'

const Divider: VFC = () => {
  return (
    <div className="inset-0 flex w-full items-center" aria-hidden="true">
      <div className="m-auto w-full rounded-full border-t border-dark-900" />
    </div>
  )
}

export default Divider

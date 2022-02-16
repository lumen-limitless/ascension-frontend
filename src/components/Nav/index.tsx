import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { capitalize, classNames } from '../../functions'

type NavItemProps = {
  path?: string
}
const NavItem = ({ path }: NavItemProps) => {
  const { pathname } = useRouter()
  return (
    <div
      className={classNames(
        'flex h-full w-full cursor-pointer items-center  justify-center hover:opacity-80',
        pathname === path ? ' text-ascend-yellow  ' : null
      )}
    >
      <Link href={path} passHref={true}>
        <div className="flex h-full w-full items-center justify-center text-xl">
          {path === '/' ? 'Dashboard' : capitalize(path.substring(1))}
        </div>
      </Link>
    </div>
  )
}
export interface NavProps {
  className?: string
}
export default function Nav({ className }: NavProps) {
  return (
    <nav
      id="nav"
      className={classNames(
        className,
        'z-50 mx-8 flex h-full flex-col items-center justify-center gap-8 py-8 md:flex-row md:p-0'
      )}
    >
      <NavItem path="/" />
      <NavItem path="/stake" />
      <NavItem path="/tools" />
    </nav>
  )
}

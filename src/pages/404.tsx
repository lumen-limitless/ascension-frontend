import { NextPage } from 'next'
import Link from 'next/link'
import Logo from '../components/ui/Logo'

const Custom404Page: NextPage = () => {
  return (
    <div className="flex min-h-full flex-grow flex-col pt-8 pb-12">
      <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <Link href="/" className="inline-flex">
            <>
              <span className="sr-only">Your Company</span>
              <Logo size={64} />
            </>
          </Link>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-secondary">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                <>
                  Go back home <span aria-hidden="true"> &rarr;</span>
                </>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Custom404Page

import Image from 'next/image'
import Divider from '../Divider'

const navigation = {
  main: [
    { name: 'Docs', href: 'https://ascension-group.gitbook.io/ascension-protocol/' },
    { name: 'Blog', href: 'https://ascensionprotocolofficial.medium.com/' },
    { name: 'Vote', href: 'https://vote.ascensionprotocol.io/#/' },
    { name: 'Bridge', href: 'https://bridge.arbitrum.io/' },
    { name: 'Legal', href: 'https://ascensionprotocol.io/legal' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://mobile.twitter.com/AscendProtocol',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Ascension-group',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/8k2zGuGeAZ',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0a12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055a20.03 20.03 0 0 0 5.993 2.98a.078.078 0 0 0 .084-.026a13.83 13.83 0 0 0 1.226-1.963a.074.074 0 0 0-.041-.104a13.201 13.201 0 0 1-1.872-.878a.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-2.981a.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028ZM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38c0-1.312.956-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.956 2.38-2.157 2.38Zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38c0-1.312.955-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.946 2.38-2.157 2.38Z"
          />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: 'https://t.me/AscensionProtocolChat',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" {...props}>
          <path
            fillRule="evenodd"
            d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12S5.373 0 12 0s12 5.373 12 12ZM12.43 8.859c-1.167.485-3.5 1.49-6.998 3.014c-.568.226-.866.447-.893.663c-.046.366.412.51 1.034.705c.085.027.173.054.263.084c.613.199 1.437.432 1.865.441c.389.008.823-.152 1.302-.48c3.268-2.207 4.955-3.322 5.061-3.346c.075-.017.179-.039.249.024c.07.062.063.18.056.212c-.046.193-1.84 1.862-2.77 2.726c-.29.269-.495.46-.537.504c-.094.097-.19.19-.282.279c-.57.548-.996.96.024 1.632c.49.323.882.59 1.273.856c.427.291.853.581 1.405.943c.14.092.274.187.405.28c.497.355.944.673 1.496.623c.32-.03.652-.331.82-1.23c.397-2.126 1.179-6.73 1.36-8.628a2.111 2.111 0 0 0-.02-.472a.506.506 0 0 0-.172-.325c-.143-.117-.365-.142-.465-.14c-.451.008-1.143.249-4.476 1.635Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:admin@ascensionprotocol.io',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 28 24" aria-hidden="true" role="img" {...props}>
          <path
            fillRule="evenodd"
            d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H26C26.5304 20 27.0391 19.7893 27.4142 19.4142C27.7893 19.0391 28 18.5304 28 18V2C28 1.46957 27.7893 0.960859 27.4142 0.585786C27.0391 0.210714 26.5304 0 26 0V0ZM23.8 2L14 8.78L4.2 2H23.8ZM2 18V2.91L13.43 10.82C13.5974 10.9361 13.7963 10.9984 14 10.9984C14.2037 10.9984 14.4026 10.9361 14.57 10.82L26 2.91V18H2Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'CoinGecko',
      href: 'https://www.coingecko.com/en/coins/ascension-protocol',
      icon: (props) => (
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          viewBox="0 0 48 48"
          {...props}
        >
          <circle
            cx="24"
            cy="24"
            r="21.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.051 37.228c4.519-9.359 1.828-21.471 9.117-23.378s12.056 1.346 15.87 2.468s6.978 1.716 7.682 5.27C40.729 26.693 24.13 35.71 27.664 45.5"
          />
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M24.355 26.972c3.196 2.523 6.496 1.685 13.796-1.373m-8.302-10.062c0-2.273-4.148-4.098-6.719-2.079"
          />
          <circle
            cx="21.047"
            cy="19.122"
            r="3.308"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="21.047"
            cy="19.122"
            r="1.29"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="34.841" cy="22.991" r=".775" fill="currentColor" />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M42.375 22.99A18.404 18.404 0 0 0 25.033 5.628"
          />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className=" relative text-center">
      <Divider />
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <Image src="/images/mono-logotype-white-p-1080.png" height="80" width="80" alt="ascension protocol" />
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-3 py-3 md:px-6">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-base text-gray-500 transition hover:text-white"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>{' '}
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-white"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <span className="absolute bottom-1 right-1">DEVELOPMENT BUILD</span>
    </footer>
  )
}

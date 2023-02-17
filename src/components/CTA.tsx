import Button from './ui/Button'
import Container from './ui/Container'
import Logo from './ui/Logo'
import { motion } from 'framer-motion'
import Section from './ui/Section'
export default function CTA({}: {}) {
  return (
    <>
      <Section className="  bg-purple-900 py-24" id="cta">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple via-pink to-yellow opacity-100 blur-3xl" />
        <Container className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 1 }}
            className=""
          >
            <h4 className="mb-12 text-center text-5xl font-bold  text-primary md:text-6xl lg:text-7xl">
              Join the Ascension
            </h4>
            <div className="grid grid-cols-1 place-content-center gap-6 md:grid-cols-2">
              <a
                href="https://t.me/AscensionProtocolChat"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  full
                  className="bg-[#2AABEE] hover:shadow-[#2AABEE]/10"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" height={24}>
                    <path
                      fillRule="evenodd"
                      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12S5.373 0 12 0s12 5.373 12 12ZM12.43 8.859c-1.167.485-3.5 1.49-6.998 3.014c-.568.226-.866.447-.893.663c-.046.366.412.51 1.034.705c.085.027.173.054.263.084c.613.199 1.437.432 1.865.441c.389.008.823-.152 1.302-.48c3.268-2.207 4.955-3.322 5.061-3.346c.075-.017.179-.039.249.024c.07.062.063.18.056.212c-.046.193-1.84 1.862-2.77 2.726c-.29.269-.495.46-.537.504c-.094.097-.19.19-.282.279c-.57.548-.996.96.024 1.632c.49.323.882.59 1.273.856c.427.291.853.581 1.405.943c.14.092.274.187.405.28c.497.355.944.673 1.496.623c.32-.03.652-.331.82-1.23c.397-2.126 1.179-6.73 1.36-8.628a2.111 2.111 0 0 0-.02-.472a.506.506 0 0 0-.172-.325c-.143-.117-.365-.142-.465-.14c-.451.008-1.143.249-4.476 1.635Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Join Telegram
                </Button>
              </a>
              <a
                href="https://discord.gg/8k2zGuGeAZ"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  full
                  className="bg-[#5865F2] hover:shadow-[#5865F2]/10"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" height={24}>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0a12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055a20.03 20.03 0 0 0 5.993 2.98a.078.078 0 0 0 .084-.026a13.83 13.83 0 0 0 1.226-1.963a.074.074 0 0 0-.041-.104a13.201 13.201 0 0 1-1.872-.878a.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-2.981a.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028ZM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38c0-1.312.956-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.956 2.38-2.157 2.38Zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38c0-1.312.955-2.38 2.157-2.38c1.21 0 2.176 1.077 2.157 2.38c0 1.312-.946 2.38-2.157 2.38Z"
                    />
                  </svg>
                  Join Discord
                </Button>
              </a>
              <a
                href="https://docs.ascensionprotocol.io"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  full
                  className="bg-purple hover:shadow-purple/10"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View Documentation
                </Button>
              </a>
              <a
                href="https://app.sushi.com/swap?&outputCurrency=0x9e724698051da34994f281bd81c3e7372d1960ae"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button size="lg" full color="gray">
                  <Logo className="h-6" />
                  Purchase ASCEND
                </Button>
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

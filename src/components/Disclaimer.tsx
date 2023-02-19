import { DisclaimerComponent } from '@rainbow-me/rainbowkit'

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://docs.ascensionprotocol.io/ascension-protocol/terms-of-service">
      Terms of Service
    </Link>{' '}
    and acknowledge you have read and understood the protocol{' '}
    <Link href="https://docs.ascensionprotocol.io/ascension-protocol/privacy-policy">
      Privacy Policy
    </Link>
  </Text>
)

export default Disclaimer

import { NextPage } from 'next'
import Image from 'next/image'
import FadeInWhenVisible from '../animation/fadeInWhenVisible'
import Container from '../components/Container'

const HomePage: NextPage = () => {
  return (
    <>
      <div className=" relative flex h-screen w-full items-center justify-center ">
        <Image src="/images/bg.jpg" layout="fill" alt="" objectFit="fill" />
        <Container maxWidth="7xl">
          <div className="text-center">
            <Image src="/images/ASCEND-rise-animation.gif" width="250px" height="250px" alt="" />
            <FadeInWhenVisible>
              <h1 className="text-7xl text-white drop-shadow-2xl">Prepare for Ascension</h1>
            </FadeInWhenVisible>
          </div>
        </Container>
      </div>
    </>
  )
}

export default HomePage

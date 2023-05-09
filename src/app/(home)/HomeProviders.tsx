'use client'
import { LazyMotion, domAnimation } from 'framer-motion'

export default function RootProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  )
}

import { HTMLMotionProps, motion } from 'framer-motion'
import { FC } from 'react'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
}
const FadeIn: FC<FadeInProps> = ({ children, delay = 0, duration = 0.66, ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
      transition={{ ease: 'easeInOut', delay: delay, duration: duration }}
      animate={{ opacity: 1 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn

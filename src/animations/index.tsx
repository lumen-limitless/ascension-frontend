import { HTMLMotionProps, motion, Variants } from 'framer-motion'

interface MotionProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
  variant: 'fadeIn' | 'fadeUp'
}

const MOTION_VARIANTS: { [key: string]: Variants } = {
  fadeIn: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  fadeUp: {
    visible: { opacity: 1, translateY: 0 },
    hidden: { opacity: 0, translateY: '33%' },
  },
}
export default function Motion({
  children,
  delay = 0,
  duration = 0.33,
  variant,
  ...rest
}: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: true }}
      transition={{ ease: 'easeOut', delay: delay, duration: duration }}
      variants={MOTION_VARIANTS[variant]}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

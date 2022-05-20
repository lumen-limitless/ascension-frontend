import { motion } from 'framer-motion'

export default function FadeIn({ children, delay = 0, duration = 0.66 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
      transition={{ ease: 'easeInOut', delay: delay, duration: duration }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}

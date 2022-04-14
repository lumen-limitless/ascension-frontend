import { motion } from 'framer-motion'

export default function FadeInWhenVisible({ children, delay = 0.33 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ ease: 'easeIn', delay: delay, duration: 0.33 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

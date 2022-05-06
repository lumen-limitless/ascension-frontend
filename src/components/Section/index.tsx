import { classNames } from '../../functions'

const Section = ({ children, className = '', id = '', style = {} }) => (
  <div
    className={classNames(
      className,
      'relative flex h-full min-h-screen w-full  items-center justify-center'
    )}
    id={id}
    style={style}
  >
    {children}
  </div>
)

export default Section

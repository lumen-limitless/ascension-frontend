export default function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="m-auto w-full rounded-full border-t border-dark-900" />
      </div>
    </div>
  )
}

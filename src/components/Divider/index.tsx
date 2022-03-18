export default function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="m-auto w-[66%] rounded-full border-t border-dark-600" />
      </div>
    </div>
  )
}

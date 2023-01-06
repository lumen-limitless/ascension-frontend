export default function Banner({ message }: { message: string }) {
  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600">
      {message}
    </div>
  )
}

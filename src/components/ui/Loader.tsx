'use client'
import React from 'react'

export interface LoaderProps {
  size?: number
  message?: string
}
export default function Loader({ size = 48, message }: LoaderProps) {
  return (
    <div className="flex h-full w-full flex-col place-content-center place-items-center">
      <object
        data="assets/logo.svg"
        width={size}
        height={size}
        className="animate-pulse"
      />
      {message && <strong>{message}</strong>}
    </div>
  )
}

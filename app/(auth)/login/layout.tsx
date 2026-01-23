import React from 'react'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#922B21] via-[#7A2318] to-[#1A1A1B]">
      {children}
    </div>
  )
}

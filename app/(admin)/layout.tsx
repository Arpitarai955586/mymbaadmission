// Admin routes use root layout but dashboard handles its own layout without header/footer
// This file exists to override root layout behavior for admin routes

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

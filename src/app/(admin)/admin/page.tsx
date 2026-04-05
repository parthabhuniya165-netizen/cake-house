import { redirect } from 'next/navigation'

export default function AdminRootPage() {
  // Redirecting the root /admin path to the Orders dashboard.
  // The middleware will handle unauthenticated users to /admin/login.
  redirect('/admin/orders')
}

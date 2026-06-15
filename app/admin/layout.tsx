'use client'
import { AdminNav } from '@/components/admin-nav'
import { BottomTab } from '@/components/bottom-tab'
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <AdminNav/>
      <main className="page-app">{children}</main>
      <BottomTab mode="admin"/>
    </div>
  )
}

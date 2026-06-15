'use client'
import { RepNav } from '@/components/rep-nav'
import { BottomTab } from '@/components/bottom-tab'
export default function RepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <RepNav/>
      <main className="page-app">{children}</main>
      <BottomTab mode="repartidor"/>
    </div>
  )
}

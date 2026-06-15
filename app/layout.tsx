import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

export const viewport: Viewport = {
  themeColor: '#1E6FAE', width:'device-width',
  initialScale:1, viewportFit:'cover',
}
export const metadata: Metadata = {
  title: { default:'Purificadora Península', template:'%s | Península' },
  description: 'Agua purificada a domicilio en Cancún. Garrafones 20L, entrega rápida.',
  manifest: '/manifest.json',
  appleWebApp: { capable:true, statusBarStyle:'black-translucent', title:'Península' },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark" style={{colorScheme:'dark',background:'#060f08'}}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="theme-color" content="#1E6FAE"/>
      </head>
      <body style={{background:'#060f08',color:'#f0f8f0'}}>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-center" theme="dark"/>
        </ThemeProvider>
      </body>
    </html>
  )
}

'use client'
import { Logo } from './logo'
import { SVG } from './svg'
import { useTheme } from '@/lib/theme'
import { usePathname } from 'next/navigation'
const LABELS: Record<string,string> = {
  '/admin':'Dashboard','/admin/pedidos':'Pedidos',
  '/admin/clientes':'Clientes','/admin/repartidores':'Repartidores','/admin/config':'Config',
}
export function AdminNav() {
  const { theme, toggle } = useTheme()
  const pathname = usePathname()
  const label = Object.entries(LABELS).find(([k])=>pathname===k)?.[1]??'Admin'
  return (
    <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
      paddingTop:'env(safe-area-inset-top,0px)',
      background:'rgba(6,15,8,.97)',backdropFilter:'blur(20px)',
      WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid var(--border)'}}>
      <div style={{height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10}}>
        <Logo size={14}/>
        <span style={{fontSize:10,fontWeight:600,color:'var(--blue)',
          background:'rgba(30,111,174,.1)',border:'1px solid rgba(30,111,174,.25)',
          borderRadius:8,padding:'2px 8px'}}>Admin</span>
        <span style={{flex:1,textAlign:'center',fontSize:15,fontWeight:700,color:'var(--txt)'}}>{label}</span>
        <button onClick={toggle} style={{width:36,height:36,borderRadius:10,
          border:'1px solid var(--border)',background:'var(--surface)',
          color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
        </button>
        <img src="https://pravatar.cc/150?img=50"
          style={{width:32,height:32,borderRadius:10,border:'1.5px solid rgba(30,111,174,.4)'}} alt="admin"/>
      </div>
    </header>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SVG } from './svg'
type Mode = 'cliente'|'repartidor'|'admin'
const TABS = {
  cliente: [
    {href:'/',icon:'home',label:'Inicio',exact:true},
    {href:'/pedidos',icon:'orders',label:'Mis pedidos'},
    {href:'/cuenta',icon:'user',label:'Cuenta'},
  ],
  repartidor: [
    {href:'/rep',icon:'map',label:'Mi ruta',exact:true},
    {href:'/rep/pedidos',icon:'truck',label:'Pedidos'},
    {href:'/rep/perfil',icon:'user',label:'Perfil'},
  ],
  admin: [
    {href:'/admin',icon:'chart',label:'Dashboard',exact:true},
    {href:'/admin/pedidos',icon:'orders',label:'Pedidos'},
    {href:'/admin/clientes',icon:'users',label:'Clientes'},
    {href:'/admin/config',icon:'gear',label:'Config'},
  ],
}
export function BottomTab({ mode }: { mode: Mode }) {
  const pathname = usePathname()
  const tabs = TABS[mode]
  const accent = mode==='admin'?'var(--blue)':mode==='repartidor'?'var(--green)':'var(--blue)'
  return (
    <nav style={{
      position:'fixed',bottom:0,left:0,right:0,zIndex:100,
      height:'calc(56px + env(safe-area-inset-bottom,0px))',
      paddingBottom:'env(safe-area-inset-bottom,0px)',
      background:'rgba(6,15,8,.97)',
      backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{height:56,display:'flex',alignItems:'stretch'}}>
        {tabs.map(tab => {
          const active = tab.exact?pathname===tab.href:pathname.startsWith(tab.href)
          return (
            <Link key={tab.href} href={tab.href} style={{
              flex:1,display:'flex',flexDirection:'column',alignItems:'center',
              justifyContent:'center',gap:3,textDecoration:'none',
              color:active?accent:'var(--txt3)',transition:'color .15s',position:'relative',
            }}>
              {active&&<div style={{position:'absolute',top:0,width:28,height:2,
                background:accent,borderRadius:'0 0 2px 2px'}}/>}
              <span dangerouslySetInnerHTML={{__html:SVG[tab.icon]??''}}
                style={{display:'flex'}} />
              <span style={{fontSize:10,fontWeight:active?600:400}}>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

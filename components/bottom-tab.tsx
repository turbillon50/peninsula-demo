'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SVG } from './svg'
import { motion, LayoutGroup } from 'framer-motion'

type Mode = 'cliente'|'repartidor'|'admin'
const TABS = {
  cliente:[
    {href:'/',icon:'home',label:'Inicio',exact:true},
    {href:'/pedidos',icon:'orders',label:'Pedidos'},
    {href:'/cuenta',icon:'user',label:'Cuenta'},
  ],
  repartidor:[
    {href:'/rep',icon:'map',label:'Mi ruta',exact:true},
    {href:'/rep/pedidos',icon:'truck',label:'Entregas'},
    {href:'/rep/perfil',icon:'user',label:'Perfil'},
  ],
  admin:[
    {href:'/admin',icon:'chart',label:'Dashboard',exact:true},
    {href:'/admin/pedidos',icon:'orders',label:'Pedidos'},
    {href:'/admin/reportes',icon:'star',label:'Reportes'},
    {href:'/admin/config',icon:'gear',label:'Config'},
  ],
}
export function BottomTab({ mode }: { mode: Mode }) {
  const pathname=usePathname()
  const tabs=TABS[mode]
  const accent=mode==='admin'?'var(--blue)':mode==='repartidor'?'var(--green)':'var(--blue)'
  return(
    <nav style={{
      position:'fixed',bottom:0,left:0,right:0,zIndex:100,
      height:'calc(60px + env(safe-area-inset-bottom,0px))',
      paddingBottom:'env(safe-area-inset-bottom,0px)',
      background:'rgba(6,15,8,.95)',
      backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',
      borderTop:'1px solid rgba(30,111,174,.2)',
    }}>
      <LayoutGroup>
        <div style={{height:60,display:'flex',alignItems:'stretch'}}>
          {tabs.map(tab=>{
            const active=tab.exact?pathname===tab.href:pathname.startsWith(tab.href)
            return(
              <Link key={tab.href} href={tab.href} style={{
                flex:1,display:'flex',flexDirection:'column',
                alignItems:'center',justifyContent:'center',
                gap:4,textDecoration:'none',position:'relative',
                color:active?accent:'var(--txt3)',
              }}>
                {active&&(
                  <motion.div layoutId="tab-pill"
                    style={{position:'absolute',top:0,left:'20%',right:'20%',
                      height:2.5,background:accent,borderRadius:2}}
                    transition={{type:'spring',stiffness:380,damping:30}}/>
                )}
                <motion.span
                  animate={{scale:active?1.15:1,y:active?-1:0}}
                  transition={{type:'spring',stiffness:400,damping:25}}
                  dangerouslySetInnerHTML={{__html:SVG[tab.icon]??''}}
                  style={{display:'flex',color:active?accent:'var(--txt3)'}}/>
                <span style={{fontSize:10,fontWeight:active?700:400,
                  color:active?accent:'var(--txt3)'}}>
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </LayoutGroup>
    </nav>
  )
}

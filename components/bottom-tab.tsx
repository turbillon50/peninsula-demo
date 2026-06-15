'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SVG } from './svg'
import { motion } from 'framer-motion'

type Mode = 'cliente'|'repartidor'|'admin'
const TABS = {
  cliente:    [
    {href:'/',icon:'home',label:'Inicio',exact:true},
    {href:'/pedidos',icon:'orders',label:'Pedidos'},
    {href:'/cuenta',icon:'user',label:'Cuenta'},
  ],
  repartidor: [
    {href:'/rep',icon:'map',label:'Mi ruta',exact:true},
    {href:'/rep/pedidos',icon:'truck',label:'Entregas'},
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
  const accent = mode==='admin'?'#1E6FAE':mode==='repartidor'?'#3A8C3F':'#1E6FAE'

  return (
    <nav className="bottom-tab">
      <div style={{height:'var(--tab-h)',display:'flex',alignItems:'center',padding:'0 8px'}}>
        {tabs.map(tab => {
          const active = tab.exact ? pathname===tab.href : pathname.startsWith(tab.href)
          return (
            <Link key={tab.href} href={tab.href} style={{
              flex:1,display:'flex',flexDirection:'column',alignItems:'center',
              justifyContent:'center',gap:4,textDecoration:'none',
              color:active?accent:'var(--txt3)',transition:'all .2s',
              position:'relative',padding:'6px 0',
            }}>
              {active && (
                <motion.div layoutId="tab-pill"
                  style={{position:'absolute',top:0,left:'15%',right:'15%',
                    height:3,background:accent,borderRadius:2}}
                  transition={{type:'spring',stiffness:400,damping:30}}/>
              )}
              <motion.div
                animate={{scale:active?1.15:1,y:active?-1:0}}
                transition={{type:'spring',stiffness:400,damping:25}}
                style={{color:active?accent:'var(--txt3)'}}>
                <span dangerouslySetInnerHTML={{__html:SVG[tab.icon]??''}}
                  style={{display:'flex'}}/>
              </motion.div>
              <span style={{fontSize:10,fontWeight:active?700:400,
                color:active?accent:'var(--txt3)',letterSpacing:active?'.01em':0}}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

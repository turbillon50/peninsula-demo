'use client'
import { PEDIDOS } from '@/lib/data'
import { motion } from 'framer-motion'
import { BottomTab } from '@/components/bottom-tab'
import { Logo } from '@/components/logo'
import Link from 'next/link'

const EST: Record<string,{c:string;bg:string;emoji:string}> = {
  'Pendiente':  {c:'var(--gold)',bg:'rgba(251,191,36,.12)',emoji:'⏳'},
  'En camino':  {c:'var(--blue)',bg:'rgba(30,111,174,.12)',emoji:'🚚'},
  'Entregado':  {c:'var(--green)',bg:'rgba(58,140,63,.12)',emoji:'✅'},
  'Cancelado':  {c:'var(--red)',bg:'rgba(248,113,113,.12)',emoji:'❌'},
}

export default function PedidosPage() {
  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.97)',backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)'}}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10}}>
          <Logo size={16}/>
          <p style={{flex:1,fontSize:16,fontWeight:800,color:'var(--txt)'}}>Mis pedidos</p>
        </div>
      </header>
      <main style={{paddingTop:'calc(52px + env(safe-area-inset-top,0px))',
        paddingBottom:'calc(56px + env(safe-area-inset-bottom,0px) + 8px)',padding:
        'calc(52px + env(safe-area-inset-top,0px)) 14px calc(56px + env(safe-area-inset-bottom,0px) + 8px)'}}>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
          {PEDIDOS.map((q,i)=>{
            const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',emoji:'📦'}
            return (
              <motion.div key={q.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                transition={{delay:i*.05}}
                style={{background:'var(--card)',border:'1px solid var(--border)',
                  borderRadius:14,padding:14}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:12,fontWeight:700,color:'var(--txt)',fontFamily:'monospace'}}>{q.id.toUpperCase()}</span>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:8,
                    color:e.c,background:e.bg}}>{e.emoji} {q.estado}</span>
                </div>
                <p style={{fontSize:13,color:'var(--txt2)',marginBottom:4}}>{q.productos}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <p style={{fontSize:11,color:'var(--txt3)'}}>
                    📍 {q.direccion.slice(0,30)}...
                  </p>
                  <p style={{fontSize:16,fontWeight:900,color:'var(--blue)',
                    fontFeatureSettings:"'tnum'"}}>${q.total}</p>
                </div>
                <p style={{fontSize:10,color:'var(--txt3)',marginTop:4}}>
                  {q.fecha} · {q.hora} · {q.repartidor}
                </p>
              </motion.div>
            )
          })}
        </div>
      </main>
      <BottomTab mode="cliente"/>
    </div>
  )
}

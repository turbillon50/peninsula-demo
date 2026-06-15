'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { PEDIDOS } from '@/lib/data'
import { toast } from 'sonner'

const EST: Record<string,{c:string;bg:string;emoji:string}> = {
  'Pendiente': {c:'var(--gold)',bg:'rgba(251,191,36,.12)',emoji:'⏳'},
  'En camino': {c:'var(--blue)',bg:'rgba(30,111,174,.12)',emoji:'🚚'},
  'Entregado': {c:'var(--green)',bg:'rgba(58,140,63,.12)',emoji:'✅'},
  'Cancelado': {c:'var(--red)',bg:'rgba(248,113,113,.12)',emoji:'❌'},
}

export default function AdminPedidosPage() {
  const [f,setF]=useState('')
  const filtered=PEDIDOS.filter(q=>!f||q.estado===f)
  return (
    <div style={{padding:16}}>
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:14,scrollbarWidth:'none'}}>
        {['','Pendiente','En camino','Entregado'].map(e=>{
          const colors: Record<string,string>={'Pendiente':'var(--gold)','En camino':'var(--blue)','Entregado':'var(--green)'}
          const color=colors[e]??'var(--blue)'
          return (
            <button key={e} onClick={()=>setF(e)} style={{flexShrink:0,padding:'6px 14px',
              borderRadius:20,border:`1px solid ${f===e?color:'var(--border)'}`,
              background:f===e?color+'20':'var(--surface)',
              color:f===e?color:'var(--txt3)',fontSize:12,fontWeight:600,cursor:'pointer'}}>
              {e||'Todos'}
            </button>
          )
        })}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filtered.map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',emoji:'📦'}
          return (
            <motion.div key={q.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
              transition={{delay:i*.04}}
              style={{background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:14,padding:14}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <p style={{fontSize:13,fontWeight:700,color:'var(--txt)'}}>{q.cliente}</p>
                <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:8,
                  color:e.c,background:e.bg}}>{e.emoji} {q.estado}</span>
              </div>
              <p style={{fontSize:12,color:'var(--txt2)',marginBottom:3}}>{q.productos}</p>
              <p style={{fontSize:11,color:'var(--txt3)',marginBottom:8}}>
                📍 {q.direccion} · 🛵 {q.repartidor}
              </p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <p style={{fontSize:11,color:'var(--txt3)'}}>{q.hora} · {q.telefono}</p>
                <p style={{fontSize:17,fontWeight:900,color:'var(--blue)',
                  fontFeatureSettings:"'tnum'"}}>${q.total}</p>
              </div>
              {q.estado==='Pendiente'&&(
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <button onClick={()=>toast.success('Pedido asignado a repartidor')}
                    style={{flex:1,height:34,background:'var(--blue)',color:'white',
                      fontWeight:700,fontSize:12,borderRadius:10,border:'none',cursor:'pointer'}}>
                    🛵 Asignar
                  </button>
                  <button onClick={()=>toast.error('Pedido cancelado')}
                    style={{flex:1,height:34,background:'var(--surface)',color:'var(--red)',
                      fontWeight:600,fontSize:12,borderRadius:10,
                      border:'1px solid rgba(248,113,113,.3)',cursor:'pointer'}}>
                    ✕ Cancelar
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

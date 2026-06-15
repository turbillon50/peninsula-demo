'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { PEDIDOS } from '@/lib/data'
import { SVG } from '@/components/svg'
import { toast } from 'sonner'

const EST: Record<string,{c:string;bg:string;icon:string}> = {
  'Pendiente': {c:'var(--gold)',bg:'rgba(251,191,36,.12)',icon:'clock'},
  'En camino': {c:'var(--blue)',bg:'rgba(30,111,174,.12)',icon:'truck'},
  'Entregado': {c:'var(--green)',bg:'rgba(58,140,63,.12)',icon:'check'},
  'Cancelado': {c:'var(--red)',bg:'rgba(239,68,68,.12)',icon:'back'},
}

export default function AdminPedidosPage() {
  const [f,setF]=useState('')
  const filtered=PEDIDOS.filter(q=>!f||q.estado===f)
  return (
    <div style={{padding:16}}>
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:14,scrollbarWidth:'none'}}>
        {['','Pendiente','En camino','Entregado','Cancelado'].map(e=>{
          const color=e?EST[e]?.c??'var(--blue)':'var(--blue)'
          return (
            <button key={e} onClick={()=>setF(e)}
              style={{flexShrink:0,padding:'7px 14px',borderRadius:20,fontSize:12,
                fontWeight:600,cursor:'pointer',
                border:`1px solid ${f===e?color:'var(--border)'}`,
                background:f===e?color+'20':'var(--surface)',
                color:f===e?color:'var(--txt3)'}}>
              {e||'Todos'}
            </button>
          )
        })}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filtered.map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',icon:'orders'}
          return (
            <motion.div key={q.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              transition={{delay:i*.04}}
              style={{background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:16,padding:14,boxShadow:'0 2px 10px rgba(0,0,0,.2)'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <p style={{fontSize:13,fontWeight:700,color:'var(--txt)'}}>{q.cliente}</p>
                <div style={{display:'flex',alignItems:'center',gap:5,
                  background:e.bg,borderRadius:20,padding:'3px 10px'}}>
                  <span dangerouslySetInnerHTML={{__html:SVG[e.icon]??''}}
                    style={{display:'flex',color:e.c,transform:'scale(.65)'}}/>
                  <span style={{fontSize:10,fontWeight:700,color:e.c}}>{q.estado}</span>
                </div>
              </div>
              <p style={{fontSize:12,color:'var(--txt2)',marginBottom:4}}>{q.productos}</p>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
                <span dangerouslySetInnerHTML={{__html:SVG['pin']??''}}
                  style={{display:'flex',color:'var(--txt3)',transform:'scale(.8)',flexShrink:0}}/>
                <p style={{fontSize:11,color:'var(--txt3)'}}>{q.direccion}</p>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <span dangerouslySetInnerHTML={{__html:SVG['truck']??''}}
                    style={{display:'flex',color:'var(--txt3)',transform:'scale(.7)'}}/>
                  <p style={{fontSize:11,color:'var(--txt3)'}}>{q.repartidor} · {q.hora}</p>
                </div>
                <p style={{fontSize:17,fontWeight:900,color:'var(--blue)',
                  fontFeatureSettings:"'tnum'"}}>${q.total}</p>
              </div>
              {q.estado==='Pendiente'&&(
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <button onClick={()=>toast.success('Asignado a repartidor')}
                    style={{flex:1,height:34,background:'var(--blue)',color:'white',
                      fontWeight:700,fontSize:12,borderRadius:10,border:'none',
                      cursor:'pointer'}}>Asignar</button>
                  <button onClick={()=>toast.error('Pedido cancelado')}
                    style={{flex:1,height:34,background:'var(--surface)',color:'var(--red)',
                      fontWeight:600,fontSize:12,borderRadius:10,
                      border:'1px solid rgba(239,68,68,.3)',cursor:'pointer'}}>Cancelar</button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import { PEDIDOS, REPARTIDORES } from '@/lib/data'
import { toast } from 'sonner'
import { SVG } from '@/components/svg'

const IMG_REP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_030916_dd3c63ef-b91d-43f0-aa92-8c04c5a631d5.png"

const EST: Record<string,{c:string;bg:string;emoji:string}> = {
  'Pendiente': {c:'var(--gold)',bg:'rgba(251,191,36,.12)',emoji:'⏳'},
  'En camino': {c:'var(--blue)',bg:'rgba(30,111,174,.12)',emoji:'🚚'},
  'Entregado': {c:'var(--green)',bg:'rgba(58,140,63,.12)',emoji:'✅'},
}

export default function RepDashboard() {
  const rep = REPARTIDORES[0]
  const misPedidos = PEDIDOS.filter(p=>p.repartidor==='Carlos M.')
  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      {/* Hero card repartidor */}
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
        style={{borderRadius:20,overflow:'hidden',position:'relative',height:150}}>
        <img src={IMG_REP} alt="Ruta"
          style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.4)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(135deg,rgba(58,140,63,.5),rgba(2,10,5,.3))'}}/>
        <div style={{position:'absolute',inset:0,padding:20,display:'flex',
          flexDirection:'column',justifyContent:'flex-end'}}>
          <p style={{fontSize:12,color:'rgba(255,255,255,.7)',marginBottom:2}}>
            Buenos días 🌅
          </p>
          <p style={{fontSize:20,fontWeight:800,color:'white',marginBottom:8}}>
            {rep.nombre}
          </p>
          <div style={{display:'flex',gap:12}}>
            <div style={{background:'rgba(255,255,255,.12)',borderRadius:10,
              padding:'6px 12px',textAlign:'center'}}>
              <p style={{fontSize:18,fontWeight:900,color:'white'}}>{}</p>
              <p style={{fontSize:10,color:'rgba(255,255,255,.7)'}}>Pendientes</p>
            </div>
            <div style={{background:'rgba(255,255,255,.12)',borderRadius:10,
              padding:'6px 12px',textAlign:'center'}}>
              <p style={{fontSize:18,fontWeight:900,color:'#86efac'}}>{}</p>
              <p style={{fontSize:10,color:'rgba(255,255,255,.7)'}}>Entregados</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mis pedidos de hoy */}
      <div style={{background:'var(--card)',border:'1px solid var(--border)',
        borderRadius:18,overflow:'hidden'}}>
        <p style={{padding:'14px 16px',fontSize:14,fontWeight:700,color:'var(--txt)',
          borderBottom:'1px solid var(--border)'}}>📦 Mi ruta de hoy</p>
        {misPedidos.map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',emoji:'📦'}
          return (
            <div key={q.id} style={{padding:'12px 16px',
              borderBottom:i<misPedidos.length-1?'1px solid var(--border)':'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <p style={{fontSize:13,fontWeight:700,color:'var(--txt)'}}>{}</p>
                <span style={{fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:8,
                  color:e.c,background:e.bg}}>{}</span>
              </div>
              <p style={{fontSize:11,color:'var(--txt3)',marginBottom:4}}>
                📍 {q.direccion}
              </p>
              <p style={{fontSize:11,color:'var(--txt2)',marginBottom:8}}>{}</p>
              {q.estado!=='Entregado'&&(
                <div style={{display:'flex',gap:8}}>
                  <a href={`tel:${q.telefono}`} style={{flex:1,height:32,
                    background:'var(--surface)',color:'var(--txt2)',fontWeight:600,fontSize:11,
                    borderRadius:9,border:'1px solid var(--border)',textDecoration:'none',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
                    📞 Llamar
                  </a>
                  <button onClick={()=>toast.success('Entrega confirmada ✅')}
                    style={{flex:1,height:32,background:'var(--green)',color:'white',
                      fontWeight:700,fontSize:11,borderRadius:9,border:'none',cursor:'pointer'}}>
                    ✅ Entregar
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

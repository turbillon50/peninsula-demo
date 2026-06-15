'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SVG } from '@/components/svg'

const EST: Record<string,any> = {
  Pendiente:{c:'var(--gold)',bg:'rgba(251,191,36,.12)',icon:'clock'},
  'En camino':{c:'var(--blue)',bg:'rgba(30,111,174,.12)',icon:'truck'},
  Entregado:{c:'var(--green)',bg:'rgba(58,140,63,.12)',icon:'check'},
}

export default function AdminDashboard() {
  const [data,setData]=useState<{pedidos:any[];reps:any[];stats:any}>({pedidos:[],reps:[],stats:null})
  const [loading,setLoading]=useState(true)

  const load=async()=>{
    try {
      const [p,r,s]=await Promise.all([
        fetch('/api/pedidos').then(x=>x.json()),
        fetch('/api/repartidores').then(x=>x.json()),
        fetch('/api/reportes?periodo=1d').then(x=>x.json()),
      ])
      setData({pedidos:Array.isArray(p)?p:[],reps:Array.isArray(r)?r:[],stats:s})
    } catch(e){}
    setLoading(false)
  }

  useEffect(()=>{
    load()
    const t=setInterval(load,30000)
    return()=>clearInterval(t)
  },[])

  const {pedidos,reps,stats}=data
  const rs=stats?.resumen??{}
  const kpis=[
    {l:'Pedidos hoy',v:rs.total_pedidos??0,icon:'orders',c:'var(--blue)'},
    {l:'Entregados',v:rs.entregados??0,icon:'check',c:'var(--green)'},
    {l:'Pendientes',v:rs.pendientes??0,icon:'clock',c:'var(--gold)'},
    {l:'Ingreso hoy',v:'$'+Number(rs.ingreso_total??0).toLocaleString('es-MX'),icon:'chart',c:'var(--blue)'},
  ]

  if(loading) return <div style={{padding:16,color:'var(--txt3)',paddingTop:40,textAlign:'center'}}>Cargando datos...</div>

  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
        {kpis.map((k,i)=>(
          <motion.div key={k.l}
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*.07}}
            style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,padding:16}}>
            <div style={{width:36,height:36,borderRadius:11,background:k.c+'18',
              display:'flex',alignItems:'center',justifyContent:'center',marginBottom:10}}>
              <span dangerouslySetInnerHTML={{__html:SVG[k.icon]??''}}
                style={{display:'flex',color:k.c,transform:'scale(.8)'}}/>
            </div>
            <p style={{fontSize:22,fontWeight:900,color:k.c}}>{k.v}</p>
            <p style={{fontSize:11,color:'var(--txt3)',marginTop:2}}>{k.l}</p>
          </motion.div>
        ))}
      </div>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span dangerouslySetInnerHTML={{__html:SVG['truck']??''}}
              style={{display:'flex',color:'var(--blue)',transform:'scale(.8)'}}/>
            <p style={{fontSize:13,fontWeight:700,color:'var(--txt)'}}>Repartidores</p>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:5}}>
            <div style={{width:6,height:6,borderRadius:3,background:'var(--green)'}}/>
            <span style={{fontSize:10,color:'var(--green)',fontWeight:600}}>En vivo</span>
          </div>
        </div>
        {reps.map((r,i)=>(
          <div key={r.id} style={{padding:'11px 16px',
            borderBottom:i<reps.length-1?'1px solid var(--border)':'none',
            display:'flex',alignItems:'center',gap:10}}>
            <img src={'https://pravatar.cc/150?img='+r.avatar_n}
              style={{width:38,height:38,borderRadius:12}} alt={r.nombre}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{r.nombre}</p>
              <p style={{fontSize:10,color:'var(--txt3)'}}>{r.zona}</p>
            </div>
            <div style={{width:7,height:7,borderRadius:4,
              background:r.activo?'var(--green)':'var(--txt3)'}}/>
          </div>
        ))}
      </div>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{fontSize:13,fontWeight:700,color:'var(--txt)'}}>Pedidos activos</p>
          <Link href="/admin/pedidos" style={{fontSize:12,color:'var(--blue)',
            textDecoration:'none',fontWeight:600}}>Ver todos</Link>
        </div>
        {pedidos.filter((p:any)=>p.estado!=='Entregado'&&p.estado!=='Cancelado').slice(0,5).map((q:any,i:number)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',icon:'orders'}
          return(
            <div key={q.id} style={{padding:'11px 16px',
              borderBottom:i<4?'1px solid var(--border)':'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                <p style={{fontSize:11,fontWeight:700,color:'var(--txt)',fontFamily:'monospace'}}>{q.folio}</p>
                <div style={{display:'flex',alignItems:'center',gap:4,
                  background:e.bg,borderRadius:20,padding:'2px 8px'}}>
                  <span dangerouslySetInnerHTML={{__html:SVG[e.icon]??''}}
                    style={{display:'flex',color:e.c,transform:'scale(.6)'}}/>
                  <span style={{fontSize:10,fontWeight:700,color:e.c}}>{q.estado}</span>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <p style={{fontSize:12,color:'var(--txt)'}}>{q.cliente_nombre}</p>
                <p style={{fontSize:14,fontWeight:900,color:'var(--blue)'}}>${q.total}</p>
              </div>
              <p style={{fontSize:10,color:'var(--txt3)'}}>{q.repartidor_nombre??'Sin asignar'}</p>
            </div>
          )
        })}
      </div>
      <Link href="/admin/reportes"
        style={{display:'flex',alignItems:'center',gap:12,background:'var(--card)',
          border:'1px solid var(--border)',borderRadius:16,padding:'13px 16px',textDecoration:'none'}}>
        <div style={{width:38,height:38,borderRadius:11,background:'rgba(30,111,174,.12)',
          display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <span dangerouslySetInnerHTML={{__html:SVG['chart']??''}}
            style={{display:'flex',color:'var(--blue)'}}/>
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:13,fontWeight:700,color:'var(--txt)'}}>Reportes</p>
          <p style={{fontSize:10,color:'var(--txt3)'}}>Ventas, top productos, tendencias</p>
        </div>
      </Link>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SVG } from '@/components/svg'

export default function ReportesPage() {
  const [data,setData]=useState<any>(null)
  const [periodo,setPeriodo]=useState('7d')
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setLoading(true)
    fetch('/api/reportes?periodo='+periodo).then(r=>r.json())
      .then(d=>{setData(d);setLoading(false)})
  },[periodo])

  const r=data?.resumen??{}
  const dias=data?.porDia??[]
  const top=data?.topProductos??[]
  const maxV=Math.max(...dias.map((d:any)=>Number(d.ingreso)),1)

  return(
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      <div style={{display:'flex',gap:8}}>
        {[{v:'1d',l:'Hoy'},{v:'7d',l:'7 días'},{v:'30d',l:'30 días'}].map(p=>(
          <button key={p.v} onClick={()=>setPeriodo(p.v)}
            style={{flex:1,height:36,borderRadius:12,fontSize:13,fontWeight:600,cursor:'pointer',
              border:'1px solid '+(periodo===p.v?'var(--blue)':'var(--border)'),
              background:periodo===p.v?'rgba(30,111,174,.15)':'var(--surface)',
              color:periodo===p.v?'var(--blue)':'var(--txt3)'}}>
            {p.l}
          </button>
        ))}
      </div>

      {loading?(
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {[1,2,3].map(i=><div key={i} style={{height:80,borderRadius:16,
            background:'linear-gradient(90deg,var(--surface) 0%,var(--card) 50%,var(--surface) 100%)',
            backgroundSize:'600px 100%',animation:'shimmer 1.4s infinite'}}/>)}
        </div>
      ):(
        <>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
            {[
              {l:'Total pedidos',v:r.total_pedidos??0,icon:'orders',c:'var(--blue)'},
              {l:'Entregados',v:r.entregados??0,icon:'check',c:'var(--green)'},
              {l:'Ingreso total',v:'$'+Number(r.ingreso_total??0).toLocaleString('es-MX'),icon:'chart',c:'var(--blue)'},
              {l:'Ticket promedio',v:'$'+Math.round(Number(r.ticket_promedio??0)),icon:'orders',c:'var(--gold)'},
            ].map((k,i)=>(
              <motion.div key={k.l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                transition={{delay:i*.07}}
                style={{background:'var(--card)',border:'1px solid var(--border)',
                  borderRadius:16,padding:14}}>
                <div style={{width:34,height:34,borderRadius:11,background:k.c+'18',
                  display:'flex',alignItems:'center',justifyContent:'center',marginBottom:8}}>
                  <span dangerouslySetInnerHTML={{__html:SVG[k.icon]??''}}
                    style={{display:'flex',color:k.c,transform:'scale(.8)'}}/>
                </div>
                <p style={{fontSize:20,fontWeight:900,color:k.c,
                  fontFeatureSettings:"'tnum'",letterSpacing:'-.5px'}}>{k.v}</p>
                <p style={{fontSize:10,color:'var(--txt3)',marginTop:2}}>{k.l}</p>
              </motion.div>
            ))}
          </div>

          {dias.length>0&&(
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              style={{background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:18,padding:16}}>
              <p style={{fontSize:14,fontWeight:700,color:'var(--txt)',marginBottom:16}}>
                Ingreso por día
              </p>
              <div style={{display:'flex',alignItems:'flex-end',gap:6,height:80,marginBottom:8}}>
                {dias.map((d:any,i:number)=>(
                  <div key={d.dia} style={{flex:1,display:'flex',flexDirection:'column',
                    alignItems:'center',gap:3}}>
                    <span style={{fontSize:8,color:'var(--txt3)',fontFeatureSettings:"'tnum'"}}>
                      ${(Number(d.ingreso)/1000).toFixed(1)}k
                    </span>
                    <motion.div initial={{height:0}}
                      animate={{height:(Number(d.ingreso)/maxV*72)+'px'}}
                      transition={{duration:.6,delay:.2+i*.05}}
                      style={{width:'100%',minHeight:4,borderRadius:'4px 4px 0 0',
                        background:'linear-gradient(to top,var(--blue),var(--cyan))'}}/>
                    <span style={{fontSize:8,color:'var(--txt3)'}}>
                      {new Date(d.dia).toLocaleDateString('es-MX',{weekday:'short'})}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {top.length>0&&(
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              transition={{delay:.3}}
              style={{background:'var(--card)',border:'1px solid var(--border)',
                borderRadius:18,overflow:'hidden'}}>
              <p style={{padding:'14px 16px',fontSize:14,fontWeight:700,color:'var(--txt)',
                borderBottom:'1px solid var(--border)'}}>Top productos</p>
              {top.map((p:any,i:number)=>(
                <div key={p.nombre} style={{padding:'11px 16px',
                  borderBottom:i<top.length-1?'1px solid var(--border)':'none',
                  display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <p style={{fontSize:13,color:'var(--txt)',fontWeight:500}}>{p.nombre}</p>
                  <p style={{fontSize:14,fontWeight:800,color:'var(--blue)',
                    fontFeatureSettings:"'tnum'"}}>{p.total_uds} uds</p>
                </div>
              ))}
            </motion.div>
          )}

          {dias.length===0&&(
            <div style={{textAlign:'center',padding:'40px 0',color:'var(--txt3)'}}>
              <p style={{fontSize:14,color:'var(--txt2)'}}>Sin datos para este periodo</p>
              <p style={{fontSize:12,marginTop:4}}>Haz pedidos para ver reportes</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

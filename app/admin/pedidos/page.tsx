'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SVG } from '@/components/svg'
import { toast } from 'sonner'

const EST: Record<string,any> = {
  Pendiente:{c:'var(--gold)',bg:'rgba(251,191,36,.12)',icon:'clock'},
  'En camino':{c:'var(--blue)',bg:'rgba(30,111,174,.12)',icon:'truck'},
  Entregado:{c:'var(--green)',bg:'rgba(58,140,63,.12)',icon:'check'},
  Cancelado:{c:'var(--red)',bg:'rgba(239,68,68,.12)',icon:'back'},
}

export default function AdminPedidosPage() {
  const [pedidos,setPedidos]=useState<any[]>([])
  const [reps,setReps]=useState<any[]>([])
  const [f,setF]=useState('')
  const [asignando,setAsignando]=useState<string|null>(null)
  const [loading,setLoading]=useState(true)

  const load=async()=>{
    try {
      const [p,r]=await Promise.all([
        fetch('/api/pedidos').then(x=>x.json()),
        fetch('/api/repartidores').then(x=>x.json()),
      ])
      setPedidos(Array.isArray(p)?p:[])
      setReps(Array.isArray(r)?r:[])
    } catch(e){}
    setLoading(false)
  }

  useEffect(()=>{load();const t=setInterval(load,30000);return()=>clearInterval(t)},[])

  const cambiarEstado=async(id:string,estado:string)=>{
    try {
      await fetch('/api/pedidos/'+id,{method:'PATCH',
        headers:{'Content-Type':'application/json'},body:JSON.stringify({estado})})
      toast.success('Estado: '+estado)
    } catch(e){ toast.error('Error') }
    load()
  }

  const asignarRep=async(pedidoId:string,rep:any)=>{
    try {
      await fetch('/api/pedidos/'+pedidoId,{method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({repartidor_id:rep.id,repartidor_nombre:rep.nombre,estado:'En camino'})})
      toast.success('Asignado a '+rep.nombre+' · WhatsApp notificado')
    } catch(e){ toast.error('Error al asignar') }
    setAsignando(null); load()
  }

  const filtered=pedidos.filter(p=>!f||p.estado===f)

  return(
    <div style={{padding:16}}>
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:14,scrollbarWidth:'none'}}>
        {['','Pendiente','En camino','Entregado','Cancelado'].map(e=>{
          const color=e?EST[e]?.c??'var(--blue)':'var(--blue)'
          return(
            <button key={e} onClick={()=>setF(e)}
              style={{flexShrink:0,padding:'7px 14px',borderRadius:20,fontSize:12,fontWeight:600,cursor:'pointer',
                border:'1px solid '+(f===e?color:'var(--border)'),
                background:f===e?color+'20':'var(--surface)',color:f===e?color:'var(--txt3)'}}>
              {e||'Todos'} {e?'('+pedidos.filter(p=>p.estado===e).length+')':''}
            </button>
          )
        })}
        <button onClick={load} style={{flexShrink:0,padding:'7px 12px',borderRadius:20,
          fontSize:12,fontWeight:600,cursor:'pointer',border:'1px solid var(--border)',
          background:'var(--surface)',color:'var(--txt3)'}}>Actualizar</button>
      </div>

      {loading?(
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[1,2,3].map(i=><div key={i} style={{height:100,borderRadius:14,
            background:'linear-gradient(90deg,var(--surface) 0%,var(--card) 50%,var(--surface) 100%)',
            backgroundSize:'600px 100%',animation:'shimmer 1.4s infinite linear'}}/>)}
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {filtered.map((q,i)=>{
            const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',icon:'orders'}
            return(
              <motion.div key={q.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                transition={{delay:i*.04}}
                style={{background:'var(--card)',border:'1px solid var(--border)',
                  borderRadius:16,padding:14}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <p style={{fontSize:12,fontWeight:700,color:'var(--txt)',fontFamily:'monospace'}}>{q.folio}</p>
                  <div style={{display:'flex',alignItems:'center',gap:5,background:e.bg,borderRadius:20,padding:'3px 10px'}}>
                    <span dangerouslySetInnerHTML={{__html:SVG[e.icon]??''}} style={{display:'flex',color:e.c,transform:'scale(.65)'}}/>
                    <span style={{fontSize:10,fontWeight:700,color:e.c}}>{q.estado}</span>
                  </div>
                </div>
                <p style={{fontSize:14,fontWeight:600,color:'var(--txt)',marginBottom:3}}>{q.cliente_nombre}</p>
                <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:4}}>
                  <span dangerouslySetInnerHTML={{__html:SVG['pin']??''}} style={{display:'flex',color:'var(--txt3)',transform:'scale(.75)',flexShrink:0}}/>
                  <p style={{fontSize:11,color:'var(--txt3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.direccion}</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                  marginBottom:['Pendiente','En camino'].includes(q.estado)?10:0}}>
                  <p style={{fontSize:11,color:'var(--txt3)'}}>{q.repartidor_nombre??'Sin asignar'}</p>
                  <p style={{fontSize:17,fontWeight:900,color:'var(--blue)'}}>${q.total}</p>
                </div>
                {q.estado==='Pendiente'&&(
                  asignando===q.id?(
                    <AnimatePresence>
                      <motion.div initial={{opacity:0}} animate={{opacity:1}}
                        style={{display:'flex',flexDirection:'column',gap:8}}>
                        <p style={{fontSize:11,color:'var(--txt3)',fontWeight:600,marginBottom:4}}>Seleccionar repartidor:</p>
                        {reps.map(r=>(
                          <button key={r.id} onClick={()=>asignarRep(q.id,r)}
                            style={{display:'flex',alignItems:'center',gap:10,
                              background:'var(--surface)',border:'1px solid var(--border)',
                              borderRadius:12,padding:'10px 12px',cursor:'pointer',width:'100%',textAlign:'left'}}>
                            <img src={'https://pravatar.cc/150?img='+r.avatar_n} style={{width:32,height:32,borderRadius:10}} alt={r.nombre}/>
                            <div><p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{r.nombre}</p><p style={{fontSize:10,color:'var(--txt3)'}}>{r.zona}</p></div>
                            <span dangerouslySetInnerHTML={{__html:SVG['back']??''}} style={{display:'flex',color:'var(--blue)',marginLeft:'auto',transform:'rotate(180deg) scale(.8)'}}/>
                          </button>
                        ))}
                        <button onClick={()=>setAsignando(null)} style={{fontSize:12,color:'var(--txt3)',background:'none',border:'none',cursor:'pointer',padding:4,textAlign:'left'}}>Cancelar</button>
                      </motion.div>
                    </AnimatePresence>
                  ):(
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={()=>setAsignando(q.id)}
                        style={{flex:1,height:34,background:'var(--blue)',color:'white',
                          fontWeight:700,fontSize:12,borderRadius:10,border:'none',cursor:'pointer',
                          display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                        <span dangerouslySetInnerHTML={{__html:SVG['truck']??''}} style={{display:'flex',transform:'scale(.75)'}}/>
                        Asignar repartidor
                      </button>
                      <button onClick={()=>cambiarEstado(q.id,'Cancelado')}
                        style={{height:34,padding:'0 12px',background:'var(--surface)',color:'var(--red)',
                          fontWeight:600,fontSize:12,borderRadius:10,border:'1px solid rgba(239,68,68,.3)',cursor:'pointer'}}>
                        Cancelar
                      </button>
                    </div>
                  )
                )}
                {q.estado==='En camino'&&(
                  <button onClick={()=>cambiarEstado(q.id,'Entregado')}
                    style={{width:'100%',height:34,background:'var(--green)',color:'white',
                      fontWeight:700,fontSize:12,borderRadius:10,border:'none',cursor:'pointer'}}>
                    Confirmar entrega
                  </button>
                )}
              </motion.div>
            )
          })}
          {filtered.length===0&&(
            <div style={{textAlign:'center',padding:'40px 0',color:'var(--txt3)'}}>
              <p>Sin pedidos {f?'con estado '+f:''}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

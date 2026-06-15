'use client'
import { motion } from 'framer-motion'
import { PEDIDOS, REPARTIDORES } from '@/lib/data'
import { toast } from 'sonner'
import { SVG } from '@/components/svg'

const IMG_REP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_030916_dd3c63ef-b91d-43f0-aa92-8c04c5a631d5.png"

const EST: Record<string,{c:string;bg:string;icon:string}> = {
  'Pendiente': {c:'var(--gold)',bg:'rgba(251,191,36,.12)',icon:'clock'},
  'En camino': {c:'var(--blue)',bg:'rgba(30,111,174,.12)',icon:'truck'},
  'Entregado': {c:'var(--green)',bg:'rgba(58,140,63,.12)',icon:'check'},
}

export default function RepDashboard() {
  const rep=REPARTIDORES[0]
  const misPedidos=PEDIDOS.filter(p=>p.repartidor==='Carlos M.')
  const pendientes=misPedidos.filter(p=>p.estado!=='Entregado').length
  const entregados=misPedidos.filter(p=>p.estado==='Entregado').length
  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      {/* Hero card repartidor — foto Higgsfield */}
      <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
        style={{borderRadius:20,overflow:'hidden',position:'relative',height:160,
          boxShadow:'0 6px 24px rgba(0,0,0,.45)'}}>
        <img src={IMG_REP} alt="Ruta"
          style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.4)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(135deg,rgba(58,140,63,.55),rgba(2,10,5,.3))'}}/>
        <div style={{position:'absolute',inset:0,padding:20,display:'flex',
          flexDirection:'column',justifyContent:'flex-end'}}>
          <p style={{fontSize:12,color:'rgba(255,255,255,.65)',marginBottom:2}}>Buenos días</p>
          <p style={{fontSize:20,fontWeight:800,color:'white',marginBottom:10}}>{rep.nombre}</p>
          <div style={{display:'flex',gap:10}}>
            <div style={{background:'rgba(255,255,255,.12)',borderRadius:12,
              padding:'8px 16px',textAlign:'center'}}>
              <p style={{fontSize:20,fontWeight:900,color:'white'}}> {pendientes}</p>
              <p style={{fontSize:10,color:'rgba(255,255,255,.65)'}}>Pendientes</p>
            </div>
            <div style={{background:'rgba(255,255,255,.12)',borderRadius:12,
              padding:'8px 16px',textAlign:'center'}}>
              <p style={{fontSize:20,fontWeight:900,color:'#86efac'}}> {entregados}</p>
              <p style={{fontSize:10,color:'rgba(255,255,255,.65)'}}>Entregados</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pedidos del día */}
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
        transition={{delay:.2}}
        style={{background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:18,overflow:'hidden',boxShadow:'0 3px 14px rgba(0,0,0,.25)'}}>
        <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',alignItems:'center',gap:8}}>
          <span dangerouslySetInnerHTML={{__html:SVG['map']??''}}
            style={{display:'flex',color:'var(--blue)',transform:'scale(.85)'}}/>
          <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>Mi ruta de hoy</p>
        </div>
        {misPedidos.map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',icon:'orders'}
          return (
            <motion.div key={q.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
              transition={{delay:.3+i*.07}}
              style={{padding:'12px 16px',
                borderBottom:i<misPedidos.length-1?'1px solid var(--border)':'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',
                alignItems:'center',marginBottom:6}}>
                <p style={{fontSize:13,fontWeight:700,color:'var(--txt)'}}> {q.cliente}</p>
                <div style={{display:'flex',alignItems:'center',gap:5,
                  background:e.bg,borderRadius:20,padding:'3px 9px'}}>
                  <span dangerouslySetInnerHTML={{__html:SVG[e.icon]??''}}
                    style={{display:'flex',color:e.c,transform:'scale(.65)'}}/>
                  <span style={{fontSize:10,fontWeight:700,color:e.c}}>{q.estado}</span>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                <span dangerouslySetInnerHTML={{__html:SVG['pin']??''}}
                  style={{display:'flex',color:'var(--txt3)',transform:'scale(.8)',flexShrink:0}}/>
                <p style={{fontSize:11,color:'var(--txt3)'}}> {q.direccion}</p>
              </div>
              <p style={{fontSize:12,color:'var(--txt2)',marginBottom:8}}> {q.productos}</p>
              {q.estado!=='Entregado'&&(
                <div style={{display:'flex',gap:8}}>
                  <a href={`tel:${q.telefono}`} style={{flex:1,height:34,
                    background:'var(--surface)',color:'var(--txt2)',fontWeight:600,fontSize:12,
                    borderRadius:10,border:'1px solid var(--border)',textDecoration:'none',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                    <span dangerouslySetInnerHTML={{__html:SVG['user']??''}}
                      style={{display:'flex',transform:'scale(.7)'}}/>
                    Llamar
                  </a>
                  <button onClick={()=>toast.success('Entrega confirmada')}
                    style={{flex:1,height:34,background:'var(--green)',color:'white',
                      fontWeight:700,fontSize:12,borderRadius:10,border:'none',cursor:'pointer'}}>
                    Confirmar entrega
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

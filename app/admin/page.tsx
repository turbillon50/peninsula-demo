'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { KPI, PEDIDOS, REPARTIDORES, CHART_SEMANA } from '@/lib/data'
import { SVG } from '@/components/svg'

const EST: Record<string,{c:string;bg:string;icon:string}> = {
  'Pendiente': {c:'var(--gold)',bg:'rgba(251,191,36,.12)',icon:'clock'},
  'En camino': {c:'var(--blue)',bg:'rgba(30,111,174,.12)',icon:'truck'},
  'Entregado': {c:'var(--green)',bg:'rgba(58,140,63,.12)',icon:'check'},
  'Cancelado': {c:'var(--red)',bg:'rgba(239,68,68,.12)',icon:'back'},
}

const KPIS = [
  {l:'Pedidos hoy',v:String(KPI.pedidosHoy),icon:'orders',c:'var(--blue)'},
  {l:'Entregados',v:String(KPI.entregados),icon:'check',c:'var(--green)'},
  {l:'Pendientes',v:String(KPI.pendientes),icon:'clock',c:'var(--gold)'},
  {l:'Ingreso hoy',v:'$'+KPI.ingresoHoy.toLocaleString('es-MX'),icon:'chart',c:'var(--blue)'},
]

export default function AdminDashboard() {
  const maxV=Math.max(...CHART_SEMANA.map(c=>c.v))
  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      {/* KPIs con stagger y SVG */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
        {KPIS.map((k,i)=>(
          <motion.div key={k.l} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:i*.07,duration:.35}}
            style={{background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:18,padding:16,boxShadow:'0 3px 14px rgba(0,0,0,.25)'}}>
            <div style={{width:38,height:38,borderRadius:12,
              background:k.c+'18',border:'1px solid '+k.c+'30',
              display:'flex',alignItems:'center',justifyContent:'center',marginBottom:10}}>
              <span dangerouslySetInnerHTML={{__html:SVG[k.icon]??''}}
                style={{display:'flex',color:k.c,transform:'scale(.8)'}}/>
            </div>
            <p style={{fontSize:24,fontWeight:900,color:k.c,
              letterSpacing:'-.5px',fontFeatureSettings:"'tnum'"}}>{k.v}</p>
            <p style={{fontSize:11,color:'var(--txt3)',marginTop:2}}>{k.l}</p>
          </motion.div>
        ))}
      </div>

      {/* Gráfica semana */}
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
        transition={{delay:.3}}
        style={{background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:18,padding:16,boxShadow:'0 3px 14px rgba(0,0,0,.25)'}}>
        <p style={{fontSize:14,fontWeight:700,color:'var(--txt)',marginBottom:16}}>
          Ventas esta semana
        </p>
        <div style={{display:'flex',alignItems:'flex-end',gap:6,height:80,marginBottom:8}}>
          {CHART_SEMANA.map((c,i)=>(
            <div key={c.d} style={{flex:1,display:'flex',flexDirection:'column',
              alignItems:'center',gap:3}}>
              <span style={{fontSize:8,color:'var(--txt3)',fontFeatureSettings:"'tnum'"}}>
                ${(c.v/1000).toFixed(1)}k
              </span>
              <motion.div initial={{height:0}} animate={{height:(c.v/maxV*72)+'px'}}
                transition={{duration:.6,delay:.3+i*.05}}
                style={{width:'100%',
                  background:'linear-gradient(to top,var(--blue),var(--cyan))',
                  borderRadius:'4px 4px 0 0',minHeight:4}}/>
              <span style={{fontSize:9,color:'var(--txt3)'}}>{c.d}</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:11,color:'var(--green)',fontWeight:600}}>
          +15% vs semana anterior
        </p>
      </motion.div>

      {/* Repartidores */}
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
        transition={{delay:.4}}
        style={{background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:18,overflow:'hidden',boxShadow:'0 3px 14px rgba(0,0,0,.25)'}}>
        <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span dangerouslySetInnerHTML={{__html:SVG['truck']??''}}
              style={{display:'flex',color:'var(--blue)',transform:'scale(.85)'}}/>
            <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>Repartidores</p>
          </div>
          <Link href="/admin/repartidores" style={{fontSize:12,color:'var(--blue)',
            textDecoration:'none',fontWeight:600}}>Ver todos</Link>
        </div>
        {REPARTIDORES.map((r,i)=>(
          <motion.div key={r.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
            transition={{delay:.5+i*.08}}
            style={{padding:'12px 16px',
              borderBottom:i<REPARTIDORES.length-1?'1px solid var(--border)':'none',
              display:'flex',alignItems:'center',gap:12}}>
            <img src={'https://pravatar.cc/150?img='+r.avatar}
              style={{width:40,height:40,borderRadius:13,
                border:'1.5px solid var(--border)'}} alt={r.nombre}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{r.nombre}</p>
              <p style={{fontSize:11,color:'var(--txt3)'}}>{r.zona}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{fontSize:15,fontWeight:800,color:'var(--blue)',
                fontFeatureSettings:"'tnum'"}}>{r.entregados}/{r.pedidosHoy}</p>
              <p style={{fontSize:10,color:'var(--txt3)'}}>entregados</p>
            </div>
            <div style={{width:8,height:8,borderRadius:4,flexShrink:0,
              background:r.activo?'var(--green)':'var(--txt3)'}}/>
          </motion.div>
        ))}
      </motion.div>

      {/* Pedidos recientes */}
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
        transition={{delay:.5}}
        style={{background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:18,overflow:'hidden',boxShadow:'0 3px 14px rgba(0,0,0,.25)'}}>
        <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span dangerouslySetInnerHTML={{__html:SVG['orders']??''}}
              style={{display:'flex',color:'var(--blue)',transform:'scale(.85)'}}/>
            <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>Pedidos del día</p>
          </div>
          <Link href="/admin/pedidos" style={{fontSize:12,color:'var(--blue)',
            textDecoration:'none',fontWeight:600}}>Ver todos</Link>
        </div>
        {PEDIDOS.slice(0,5).map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',icon:'orders'}
          return (
            <motion.div key={q.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
              transition={{delay:.6+i*.06}}
              style={{padding:'12px 16px',
                borderBottom:i<4?'1px solid var(--border)':'none',
                display:'flex',alignItems:'center',gap:10}}>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:12,fontWeight:700,color:'var(--txt)',
                  overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.cliente}</p>
                <p style={{fontSize:10,color:'var(--txt3)',overflow:'hidden',
                  textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.productos}</p>
              </div>
              <span style={{fontSize:14,fontWeight:900,color:'var(--blue)',
                flexShrink:0,fontFeatureSettings:"'tnum'"}}>${q.total}</span>
              <div style={{display:'flex',alignItems:'center',gap:5,
                background:e.bg,borderRadius:20,padding:'3px 9px',flexShrink:0}}>
                <span dangerouslySetInnerHTML={{__html:SVG[e.icon]??''}}
                  style={{display:'flex',color:e.c,transform:'scale(.6)'}}/>
                <span style={{fontSize:10,fontWeight:700,color:e.c}}>{q.estado}</span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { KPI, PEDIDOS, REPARTIDORES, CHART_SEMANA } from '@/lib/data'

const EST: Record<string,{c:string;bg:string;emoji:string}> = {
  'Pendiente': {c:'var(--gold)',bg:'rgba(251,191,36,.12)',emoji:'⏳'},
  'En camino': {c:'var(--blue)',bg:'rgba(30,111,174,.12)',emoji:'🚚'},
  'Entregado': {c:'var(--green)',bg:'rgba(58,140,63,.12)',emoji:'✅'},
  'Cancelado': {c:'var(--red)',bg:'rgba(248,113,113,.12)',emoji:'❌'},
}

export default function AdminDashboard() {
  const maxV = Math.max(...CHART_SEMANA.map(c=>c.v))
  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      {/* KPIs */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
        {[
          {l:'Pedidos hoy',v:String(KPI.pedidosHoy),e:'📦',c:'var(--blue)'},
          {l:'Entregados',v:String(KPI.entregados),e:'✅',c:'var(--green)'},
          {l:'Pendientes',v:String(KPI.pendientes),e:'⏳',c:'var(--gold)'},
          {l:'Ingreso hoy',v:'$'+KPI.ingresoHoy.toLocaleString('es-MX'),e:'💰',c:'var(--blue)'},
        ].map((k,i)=>(
          <motion.div key={k.l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:i*.05}}
            style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:16}}>
            <span style={{fontSize:22,display:'block',marginBottom:8}}>{k.e}</span>
            <p style={{fontSize:22,fontWeight:900,color:k.c,
              letterSpacing:'-.5px',fontFeatureSettings:"'tnum'"}}>{k.v}</p>
            <p style={{fontSize:11,color:'var(--txt3)',marginTop:2}}>{k.l}</p>
          </motion.div>
        ))}
      </div>

      {/* Gráfica semana */}
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,padding:16}}>
        <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',marginBottom:14}}>
          💧 Ventas esta semana
        </p>
        <div style={{display:'flex',alignItems:'flex-end',gap:6,height:80,marginBottom:8}}>
          {CHART_SEMANA.map(c=>(
            <div key={c.d} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
              <span style={{fontSize:8,color:'var(--txt3)',fontFeatureSettings:"'tnum'"}}>
                ${(c.v/1000).toFixed(1)}k
              </span>
              <motion.div initial={{height:0}} animate={{height:(c.v/maxV*72)+'px'}}
                transition={{duration:.6,delay:.1}}
                style={{width:'100%',
                  background:'linear-gradient(to top,var(--blue),var(--cyan))',
                  borderRadius:'4px 4px 0 0',minHeight:6}}/>
              <span style={{fontSize:9,color:'var(--txt3)'}}>{c.d}</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:11,color:'var(--green)',fontWeight:600}}>
          ↑ 15% vs semana anterior
        </p>
      </div>

      {/* Repartidores activos */}
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>🛵 Repartidores hoy</p>
          <Link href="/admin/repartidores" style={{fontSize:12,color:'var(--blue)',
            textDecoration:'none',fontWeight:600}}>Ver todos</Link>
        </div>
        {REPARTIDORES.map((r,i)=>(
          <div key={r.id} style={{padding:'12px 16px',
            borderBottom:i<REPARTIDORES.length-1?'1px solid var(--border)':'none',
            display:'flex',alignItems:'center',gap:12}}>
            <img src={'https://pravatar.cc/150?img='+r.avatar}
              style={{width:38,height:38,borderRadius:12,border:'1.5px solid var(--border)'}} alt={r.nombre}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{r.nombre}</p>
              <p style={{fontSize:11,color:'var(--txt3)'}}>{r.zona}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{fontSize:14,fontWeight:800,color:'var(--blue)',fontFeatureSettings:"'tnum'"}}>
                {r.entregados}/{r.pedidosHoy}
              </p>
              <p style={{fontSize:10,color:'var(--txt3)'}}>entregados</p>
            </div>
            <span style={{width:8,height:8,borderRadius:4,
              background:r.activo?'var(--green)':'var(--txt3)',flexShrink:0}}/>
          </div>
        ))}
      </div>

      {/* Pedidos recientes */}
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
        <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>📦 Pedidos del día</p>
          <Link href="/admin/pedidos" style={{fontSize:12,color:'var(--blue)',
            textDecoration:'none',fontWeight:600}}>Ver todos</Link>
        </div>
        {PEDIDOS.slice(0,5).map((q,i)=>{
          const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',emoji:'📦'}
          return (
            <div key={q.id} style={{padding:'11px 16px',
              borderBottom:i<4?'1px solid var(--border)':'none',
              display:'flex',alignItems:'center',gap:10}}>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:12,fontWeight:700,color:'var(--txt)',
                  overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.cliente}</p>
                <p style={{fontSize:10,color:'var(--txt3)',overflow:'hidden',
                  textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.productos}</p>
              </div>
              <span style={{fontSize:14,fontWeight:900,color:'var(--blue)',
                fontFeatureSettings:"'tnum'",flexShrink:0}}>${q.total}</span>
              <span style={{fontSize:10,fontWeight:600,padding:'3px 8px',borderRadius:8,
                color:e.c,background:e.bg,flexShrink:0,whiteSpace:'nowrap'}}>{e.emoji} {q.estado}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

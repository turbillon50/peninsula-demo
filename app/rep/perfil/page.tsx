'use client'
import { REPARTIDORES } from '@/lib/data'
export default function RepPerfilPage() {
  const r = REPARTIDORES[0]
  return (
    <div style={{padding:16}}>
      <div style={{textAlign:'center',padding:'24px 0 20px'}}>
        <img src={'https://pravatar.cc/150?img='+r.avatar}
          style={{width:80,height:80,borderRadius:24,border:'2px solid rgba(58,140,63,.4)',
            display:'block',margin:'0 auto 12px'}} alt={r.nombre}/>
        <p style={{fontSize:20,fontWeight:900,color:'var(--txt)'}}>{r.nombre}</p>
        <p style={{fontSize:13,color:'var(--txt3)',marginTop:2}}>{r.zona}</p>
      </div>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden'}}>
        {[{l:'Pedidos hoy',v:r.pedidosHoy+' asignados'},
          {l:'Entregados hoy',v:r.entregados+' completados'},
          {l:'Zona',v:r.zona},
          {l:'Estado',v:r.activo?'🟢 Activo':'🔴 Inactivo'},
        ].map((f,i,arr)=>(
          <div key={f.l} style={{padding:'14px 16px',
            borderBottom:i<arr.length-1?'1px solid var(--border)':'none'}}>
            <p style={{fontSize:10,color:'var(--txt3)',textTransform:'uppercase',
              letterSpacing:'.1em',marginBottom:3}}>{f.l}</p>
            <p style={{fontSize:15,fontWeight:600,color:'var(--txt)'}}>{f.v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

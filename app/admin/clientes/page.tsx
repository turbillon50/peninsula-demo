'use client'
import { CLIENTES } from '@/lib/data'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
export default function AdminClientesPage() {
  return (
    <div style={{padding:16}}>
      <p style={{fontSize:12,color:'var(--txt3)',marginBottom:14}}>
        {CLIENTES.length} clientes registrados
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {CLIENTES.map((c,i)=>(
          <motion.div key={c.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:i*.05}} onClick={()=>toast.info(c.telefono)}
            style={{background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:16,padding:14,cursor:'pointer',
              display:'flex',alignItems:'center',gap:12}}>
            <img src={'https://pravatar.cc/150?img='+c.avatar}
              style={{width:46,height:46,borderRadius:14,border:'1.5px solid var(--border)',flexShrink:0}} alt={c.nombre}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                <p style={{fontSize:14,fontWeight:700,color:'var(--txt)'}}>{c.nombre}</p>
                {c.frecuente&&<span style={{fontSize:9,fontWeight:700,padding:'1px 6px',
                  borderRadius:8,background:'rgba(30,111,174,.15)',color:'var(--blue)'}}>
                  ⭐ Frecuente
                </span>}
              </div>
              <p style={{fontSize:11,color:'var(--txt3)',marginBottom:2,overflow:'hidden',
                textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.direccion}</p>
              <p style={{fontSize:11,color:'var(--txt3)'}}>{c.pedidosTotal} pedidos</p>
            </div>
            <p style={{fontSize:16,fontWeight:900,color:'var(--blue)',flexShrink:0,
              fontFeatureSettings:"'tnum'"}}>${c.gastoTotal.toLocaleString('es-MX')}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

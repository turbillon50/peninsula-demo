'use client'
import { PEDIDOS } from '@/lib/data'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
export default function RepPedidosPage() {
  const pedidos = PEDIDOS.filter(p=>p.repartidor==='Carlos M.')
  return (
    <div style={{padding:16}}>
      <p style={{fontSize:12,color:'var(--txt3)',marginBottom:14}}>{pedidos.length} pedidos asignados</p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {pedidos.map((q,i)=>(
          <motion.div key={q.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
            transition={{delay:i*.05}}
            style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:14,padding:14}}>
            <p style={{fontSize:14,fontWeight:700,color:'var(--txt)',marginBottom:4}}>{q.cliente}</p>
            <p style={{fontSize:12,color:'var(--txt2)',marginBottom:4}}>{q.productos}</p>
            <p style={{fontSize:11,color:'var(--txt3)',marginBottom:10}}>📍 {q.direccion}</p>
            <div style={{display:'flex',gap:8}}>
              <a href={`tel:${q.telefono}`} style={{flex:1,height:36,background:'var(--surface)',
                color:'var(--txt)',fontWeight:600,fontSize:12,borderRadius:10,
                border:'1px solid var(--border)',textDecoration:'none',
                display:'flex',alignItems:'center',justifyContent:'center'}}>📞 Llamar</a>
              {q.estado!=='Entregado'&&(
                <button onClick={()=>toast.success('Entrega confirmada')}
                  style={{flex:1,height:36,background:'var(--green)',color:'white',
                    fontWeight:700,fontSize:12,borderRadius:10,border:'none',cursor:'pointer'}}>
                  ✅ Confirmar entrega
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

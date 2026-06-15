'use client'
import { PEDIDOS } from '@/lib/data'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { SVG } from '@/components/svg'

export default function RepPedidosPage() {
  const pedidos=PEDIDOS.filter(p=>p.repartidor==='Carlos M.')
  return (
    <div style={{padding:16}}>
      <p style={{fontSize:12,color:'var(--txt3)',marginBottom:14}}>
        {pedidos.length} pedidos asignados
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {pedidos.map((q,i)=>(
          <motion.div key={q.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:i*.06}}
            style={{background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:16,padding:14,boxShadow:'0 2px 10px rgba(0,0,0,.2)'}}>
            <p style={{fontSize:14,fontWeight:700,color:'var(--txt)',marginBottom:4}}>{q.cliente}</p>
            <p style={{fontSize:12,color:'var(--txt2)',marginBottom:4}}>{q.productos}</p>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
              <span dangerouslySetInnerHTML={{__html:SVG['pin']??''}}
                style={{display:'flex',color:'var(--txt3)',transform:'scale(.8)',flexShrink:0}}/>
              <p style={{fontSize:11,color:'var(--txt3)'}}>{q.direccion}</p>
            </div>
            <div style={{display:'flex',gap:8}}>
              <a href={`tel:${q.telefono}`} style={{flex:1,height:36,background:'var(--surface)',
                color:'var(--txt)',fontWeight:600,fontSize:12,borderRadius:10,
                border:'1px solid var(--border)',textDecoration:'none',
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                Llamar
              </a>
              {q.estado!=='Entregado'&&(
                <button onClick={()=>toast.success('Entrega confirmada')}
                  style={{flex:1,height:36,background:'var(--green)',color:'white',
                    fontWeight:700,fontSize:12,borderRadius:10,border:'none',cursor:'pointer'}}>
                  Confirmar entrega
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

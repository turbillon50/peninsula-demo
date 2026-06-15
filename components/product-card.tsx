'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import type { Producto } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import { SVG } from './svg'
import { toast } from 'sonner'

export function ProductCard({ p }: { p: Producto }) {
  const add = useStore(s => s.addItem)
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)

  return (
    <>
      <motion.div
        initial={{opacity:0,y:16}}
        animate={{opacity:1,y:0}}
        whileHover={{y:-4,boxShadow:'0 12px 40px rgba(0,0,0,.5),0 4px 12px rgba(30,111,174,.2)'}}
        whileTap={{scale:.97}}
        transition={{duration:.3,ease:[.22,1,.36,1]}}
        onClick={() => setOpen(true)}
        style={{
          background:'var(--card)',
          border:'1px solid var(--border)',
          borderRadius:20,
          overflow:'hidden',
          cursor:'pointer',
          boxShadow:'var(--shadow-card)',
          position:'relative',
        }}>
        {/* Imagen real Higgsfield */}
        <div style={{position:'relative',paddingTop:'72%',overflow:'hidden'}}>
          <img src={p.img} alt={p.nombre}
            style={{position:'absolute',inset:0,width:'100%',height:'100%',
              objectFit:'cover',transition:'transform .4s ease'}}/>
          {/* Gradiente sobre imagen */}
          <div style={{position:'absolute',inset:0,
            background:'linear-gradient(to bottom,transparent 40%,rgba(6,15,8,.85) 100%)'}}/>
          {/* Precio sobre imagen */}
          <div style={{position:'absolute',bottom:10,left:12,
            display:'flex',alignItems:'baseline',gap:2}}>
            <span style={{fontSize:20,fontWeight:900,color:'white',
              textShadow:'0 2px 8px rgba(0,0,0,.5)',fontFeatureSettings:"'tnum'"}}>
              ${p.precio}
            </span>
            <span style={{fontSize:10,color:'rgba(255,255,255,.6)',fontWeight:500}}>MXN</span>
          </div>
          {/* Badge popular */}
          {p.popular && (
            <motion.div initial={{scale:0}} animate={{scale:1}}
              transition={{delay:.2,type:'spring',stiffness:400}}
              style={{position:'absolute',top:10,right:10,
                background:'linear-gradient(135deg,#1E6FAE,#22d3ee)',
                color:'white',fontSize:9,fontWeight:800,
                padding:'3px 9px',borderRadius:20,
                boxShadow:'0 2px 8px rgba(30,111,174,.4)',
                letterSpacing:'.03em'}}>
              ⭐ Popular
            </motion.div>
          )}
        </div>
        {/* Info */}
        <div style={{padding:'12px 14px 14px'}}>
          <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',
            marginBottom:2,lineHeight:1.3}}>{p.nombre}</p>
          <p style={{fontSize:11,color:'var(--txt3)',marginBottom:12}}>{p.volumen}</p>
          {/* Botón glassmorphism */}
          <motion.div whileTap={{scale:.95}}
            onClick={e=>{
              e.stopPropagation()
              add({id:p.id,nombre:p.nombre,precio:p.precio})
              toast.success('Agregado 💧',{description:p.nombre})
            }}
            style={{
              background:'linear-gradient(135deg,#1E6FAE,#155789)',
              borderRadius:14,padding:'10px',
              display:'flex',alignItems:'center',justifyContent:'center',gap:6,
              boxShadow:'var(--shadow-blue)',
              cursor:'pointer',
            }}>
            <span dangerouslySetInnerHTML={{__html:SVG['plus']??''}}
              style={{display:'flex',color:'white',transform:'scale(.9)'}}/>
            <span style={{fontSize:12,fontWeight:700,color:'white'}}>Pedir</span>
          </motion.div>
        </div>
      </motion.div>

      {/* POP-UP MODAL al tocar la card */}
      <AnimatePresence>
        {open && (
          <div className="modal-overlay" onClick={()=>setOpen(false)}>
            <motion.div className="modal-sheet"
              initial={{y:'100%',opacity:0}}
              animate={{y:0,opacity:1}}
              exit={{y:'100%',opacity:0}}
              transition={{type:'spring',stiffness:300,damping:30}}
              onClick={e=>e.stopPropagation()}>
              {/* Handle */}
              <div style={{display:'flex',justifyContent:'center',padding:'12px 0 4px'}}>
                <div style={{width:40,height:4,borderRadius:2,background:'var(--border)'}}/>
              </div>
              {/* Imagen grande */}
              <div style={{position:'relative',width:'100%',paddingTop:'56%',overflow:'hidden'}}>
                <img src={p.img} alt={p.nombre}
                  style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={{position:'absolute',inset:0,
                  background:'linear-gradient(to bottom,transparent 50%,var(--surface) 100%)'}}/>
                {p.popular&&<div style={{position:'absolute',top:14,left:14,
                  background:'linear-gradient(135deg,#1E6FAE,#22d3ee)',
                  color:'white',fontSize:10,fontWeight:800,padding:'4px 12px',
                  borderRadius:20,boxShadow:'0 2px 10px rgba(30,111,174,.5)'}}>
                  ⭐ Más pedido
                </div>}
              </div>
              {/* Contenido */}
              <div style={{padding:'16px 20px 24px'}}>
                <p style={{fontSize:11,color:'var(--txt3)',textTransform:'uppercase',
                  letterSpacing:'.12em',marginBottom:6,fontWeight:600}}>
                  Purificadora Península
                </p>
                <h2 style={{fontSize:22,fontWeight:900,color:'var(--txt)',
                  marginBottom:4,lineHeight:1.2}}>{p.nombre}</h2>
                <p style={{fontSize:12,color:'var(--blue)',fontWeight:600,
                  marginBottom:12}}>{p.volumen}</p>
                <p style={{fontSize:13,color:'var(--txt2)',lineHeight:1.65,
                  marginBottom:20}}>{p.descripcion}</p>
                {/* Selector cantidad */}
                <div style={{display:'flex',alignItems:'center',
                  justifyContent:'space-between',marginBottom:20,
                  background:'var(--card)',border:'1px solid var(--border)',
                  borderRadius:16,padding:'12px 16px'}}>
                  <span style={{fontSize:13,color:'var(--txt2)',fontWeight:500}}>Cantidad</span>
                  <div style={{display:'flex',alignItems:'center',gap:16}}>
                    <motion.button whileTap={{scale:.85}}
                      onClick={()=>setQty(q=>Math.max(1,q-1))}
                      style={{width:36,height:36,borderRadius:12,
                        background:'var(--surface)',border:'1px solid var(--border)',
                        color:'var(--txt)',cursor:'pointer',display:'flex',
                        alignItems:'center',justifyContent:'center'}}>
                      <span dangerouslySetInnerHTML={{__html:SVG['minus']??''}} style={{display:'flex'}}/>
                    </motion.button>
                    <motion.span key={qty}
                      initial={{scale:.7,opacity:0}} animate={{scale:1,opacity:1}}
                      style={{fontSize:20,fontWeight:900,color:'var(--txt)',
                        width:28,textAlign:'center',fontFeatureSettings:"'tnum'"}}>
                      {qty}
                    </motion.span>
                    <motion.button whileTap={{scale:.85}}
                      onClick={()=>setQty(q=>q+1)}
                      style={{width:36,height:36,borderRadius:12,
                        background:'var(--blue)',border:'none',
                        color:'white',cursor:'pointer',display:'flex',
                        alignItems:'center',justifyContent:'center',
                        boxShadow:'0 2px 8px rgba(30,111,174,.4)'}}>
                      <span dangerouslySetInnerHTML={{__html:SVG['plus']??''}} style={{display:'flex'}}/>
                    </motion.button>
                  </div>
                </div>
                {/* Total + CTA */}
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{flex:1}}>
                    <p style={{fontSize:10,color:'var(--txt3)',textTransform:'uppercase',
                      letterSpacing:'.1em'}}>Total</p>
                    <p style={{fontSize:26,fontWeight:900,color:'var(--txt)',
                      fontFeatureSettings:"'tnum'",letterSpacing:'-1px'}}>
                      ${p.precio*qty}
                      <span style={{fontSize:12,color:'var(--txt3)',fontWeight:400}}> MXN</span>
                    </p>
                  </div>
                  <motion.button whileTap={{scale:.96}}
                    onClick={()=>{
                      for(let i=0;i<qty;i++) add({id:p.id,nombre:p.nombre,precio:p.precio})
                      toast.success(`${qty}x ${p.nombre} al pedido 💧`)
                      setOpen(false)
                      setQty(1)
                    }}
                    style={{flex:2,height:54,
                      background:'linear-gradient(135deg,#1E6FAE,#155789)',
                      color:'white',fontWeight:800,fontSize:15,borderRadius:18,
                      border:'none',cursor:'pointer',
                      boxShadow:'0 4px 20px rgba(30,111,174,.5)',
                      animation:'glowPulse 2s infinite'}}>
                    💧 Agregar al pedido
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useStore } from '@/lib/store'
import type { Producto } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import { SVG } from './svg'
import { toast } from 'sonner'

function Modal({ p, qty, setQty, onClose, onAdd }:
  { p:Producto; qty:number; setQty:(n:number)=>void; onClose:()=>void; onAdd:()=>void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  return createPortal(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={onClose}
      style={{position:'fixed',inset:0,zIndex:9999,
        background:'rgba(2,10,5,.88)',backdropFilter:'blur(8px)',
        WebkitBackdropFilter:'blur(8px)',display:'flex',alignItems:'flex-end'}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
        transition={{type:'spring',stiffness:320,damping:32}}
        onClick={e=>e.stopPropagation()}
        style={{width:'100%',maxHeight:'92dvh',overflowY:'auto',
          background:'var(--surface)',borderRadius:'24px 24px 0 0',
          paddingBottom:'env(safe-area-inset-bottom,24px)'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'14px 0 6px'}}>
          <div style={{width:44,height:4,borderRadius:2,background:'var(--border)'}}/>
        </div>
        {/* Imagen Higgsfield grande */}
        <div style={{position:'relative',width:'100%',paddingTop:'58%',overflow:'hidden'}}>
          <img src={p.img} alt={p.nombre}
            style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
          <div style={{position:'absolute',inset:0,
            background:'linear-gradient(to bottom,transparent 45%,var(--surface) 100%)'}}/>
          {p.popular&&<div style={{position:'absolute',top:14,left:14,
            background:'linear-gradient(135deg,#1E6FAE,#22d3ee)',
            color:'white',fontSize:10,fontWeight:800,padding:'4px 12px',
            borderRadius:20,boxShadow:'0 2px 10px rgba(30,111,174,.5)'}}>
            Popular
          </div>}
        </div>
        <div style={{padding:'16px 20px 28px'}}>
          <p style={{fontSize:11,color:'var(--txt3)',textTransform:'uppercase',
            letterSpacing:'.12em',marginBottom:6,fontWeight:600}}>Purificadora Península</p>
          <h2 style={{fontSize:22,fontWeight:900,color:'var(--txt)',marginBottom:4,lineHeight:1.2}}>
            {p.nombre}
          </h2>
          <p style={{fontSize:12,color:'var(--blue)',fontWeight:600,marginBottom:12}}>{p.volumen}</p>
          <p style={{fontSize:13,color:'var(--txt2)',lineHeight:1.65,marginBottom:20}}>
            {p.descripcion}
          </p>
          {/* Selector cantidad */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
            marginBottom:20,background:'var(--card)',border:'1px solid var(--border)',
            borderRadius:16,padding:'12px 16px'}}>
            <span style={{fontSize:13,color:'var(--txt2)',fontWeight:500}}>Cantidad</span>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <button onClick={()=>setQty(Math.max(1,qty-1))}
                style={{width:36,height:36,borderRadius:12,background:'var(--surface)',
                  border:'1px solid var(--border)',color:'var(--txt)',cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:20,fontWeight:300}}>−</button>
              <span style={{fontSize:20,fontWeight:900,color:'var(--txt)',
                width:28,textAlign:'center',fontFeatureSettings:"'tnum'"}}>{qty}</span>
              <button onClick={()=>setQty(qty+1)}
                style={{width:36,height:36,borderRadius:12,background:'var(--blue)',
                  border:'none',color:'white',cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:20,fontWeight:300}}>+</button>
            </div>
          </div>
          {/* Total + CTA */}
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{flex:1}}>
              <p style={{fontSize:10,color:'var(--txt3)',textTransform:'uppercase',letterSpacing:'.1em'}}>
                Total
              </p>
              <p style={{fontSize:28,fontWeight:900,color:'var(--txt)',
                fontFeatureSettings:"'tnum'",letterSpacing:'-1px'}}>
                ${p.precio*qty}
                <span style={{fontSize:12,color:'var(--txt3)',fontWeight:400}}> MXN</span>
              </p>
            </div>
            <button onClick={onAdd}
              style={{flex:2,height:54,
                background:'linear-gradient(135deg,#1E6FAE,#155789)',
                color:'white',fontWeight:800,fontSize:15,borderRadius:18,
                border:'none',cursor:'pointer',
                boxShadow:'0 4px 20px rgba(30,111,174,.5)'}}>
              Agregar al pedido
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

export function ProductCard({ p }: { p: Producto }) {
  const add = useStore(s => s.addItem)
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleAdd = () => {
    for(let i=0;i<qty;i++) add({id:p.id,nombre:p.nombre,precio:p.precio})
    toast.success(`${qty}x ${p.nombre} agregado`)
    setOpen(false); setQty(1)
  }

  return (
    <>
      <motion.div
        initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
        whileTap={{scale:.97}}
        transition={{duration:.3,ease:[.22,1,.36,1]}}
        onClick={() => setOpen(true)}
        style={{background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:20,overflow:'hidden',cursor:'pointer',
          boxShadow:'0 4px 20px rgba(0,0,0,.35)'}}>
        {/* Imagen Higgsfield con skeleton */}
        <div style={{position:'relative',paddingTop:'72%',overflow:'hidden',
          background:'var(--surface)'}}>
          {!imgLoaded && (
            <div style={{position:'absolute',inset:0,
              background:'linear-gradient(90deg,var(--surface) 0%,var(--card) 50%,var(--surface) 100%)',
              backgroundSize:'600px 100%',animation:'shimmer 1.4s infinite linear'}}/>
          )}
          <img src={p.img} alt={p.nombre} onLoad={()=>setImgLoaded(true)}
            style={{position:'absolute',inset:0,width:'100%',height:'100%',
              objectFit:'cover',opacity:imgLoaded?1:0,transition:'opacity .3s'}}/>
          <div style={{position:'absolute',inset:0,
            background:'linear-gradient(to bottom,transparent 40%,rgba(6,15,8,.85) 100%)'}}/>
          <div style={{position:'absolute',bottom:10,left:12}}>
            <span style={{fontSize:22,fontWeight:900,color:'white',
              textShadow:'0 2px 8px rgba(0,0,0,.6)',fontFeatureSettings:"'tnum'"}}>
              ${p.precio}
            </span>
            <span style={{fontSize:10,color:'rgba(255,255,255,.6)',marginLeft:2}}>MXN</span>
          </div>
          {p.popular&&<div style={{position:'absolute',top:10,right:10,
            background:'linear-gradient(135deg,#1E6FAE,#22d3ee)',
            color:'white',fontSize:9,fontWeight:800,
            padding:'3px 9px',borderRadius:20,
            boxShadow:'0 2px 8px rgba(30,111,174,.4)'}}>
            Popular
          </div>}
        </div>
        {/* Info */}
        <div style={{padding:'12px 14px 14px'}}>
          <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',marginBottom:2}}>{p.nombre}</p>
          <p style={{fontSize:11,color:'var(--txt3)',marginBottom:12}}>{p.volumen}</p>
          <button
            onClick={e=>{e.stopPropagation();add({id:p.id,nombre:p.nombre,precio:p.precio});
              toast.success(`${p.nombre} agregado`)}}
            style={{width:'100%',height:38,
              background:'linear-gradient(135deg,#1E6FAE,#155789)',
              borderRadius:12,border:'none',cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',gap:6,
              boxShadow:'0 3px 12px rgba(30,111,174,.35)',
              color:'white',fontWeight:700,fontSize:12}}>
            <span dangerouslySetInnerHTML={{__html:SVG['plus']??''}}
              style={{display:'flex',transform:'scale(.85)'}}/>
            Agregar
          </button>
        </div>
      </motion.div>

      {mounted && open && (
        <AnimatePresence>
          <Modal p={p} qty={qty} setQty={setQty}
            onClose={()=>setOpen(false)} onAdd={handleAdd}/>
        </AnimatePresence>
      )}
    </>
  )
}

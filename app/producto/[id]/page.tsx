'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PRODUCTOS } from '@/lib/data'
import { useStore } from '@/lib/store'
import { BottomTab } from '@/components/bottom-tab'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'
import { toast } from 'sonner'
import { useState } from 'react'

export default function ProductoPage() {
  const { id } = useParams<{id:string}>()
  const p = PRODUCTOS.find(x=>x.id===id)
  const add = useStore(s=>s.addItem)
  const { theme, toggle } = useTheme()
  const [qty, setQty] = useState(1)
  if(!p) return <div style={{minHeight:'100dvh',background:'var(--bg)',display:'flex',
    alignItems:'center',justifyContent:'center',color:'var(--txt3)'}}>No encontrado</div>

  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.97)',backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)'}}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 14px',gap:10}}>
          <Link href="/catalogo" style={{width:38,height:38,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            display:'flex',alignItems:'center',justifyContent:'center',
            color:'var(--txt2)',textDecoration:'none',flexShrink:0}}>
            <span dangerouslySetInnerHTML={{__html:SVG['back']??''}} style={{display:'flex'}}/>
          </Link>
          <p style={{flex:1,fontSize:14,fontWeight:700,color:'var(--txt)',
            overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.nombre}</p>
          <button onClick={toggle} style={{width:38,height:38,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </button>
        </div>
      </header>

      <main style={{paddingTop:'calc(52px + env(safe-area-inset-top,0px))',
        paddingBottom:'calc(80px + 56px + env(safe-area-inset-bottom,0px))'}}>
        {/* Foto Higgsfield */}
        <div style={{position:'relative',width:'100%',paddingTop:'65%',
          background:'var(--surface)',overflow:'hidden'}}>
          <motion.img src={p.img} alt={p.nombre}
            initial={{scale:1.05,opacity:.8}} animate={{scale:1,opacity:1}}
            transition={{duration:.4}}
            style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
          {p.popular&&<div style={{position:'absolute',top:12,left:12,
            background:'var(--blue)',color:'white',fontSize:11,fontWeight:700,
            padding:'4px 12px',borderRadius:20}}>⭐ Más pedido</div>}
        </div>
        <div style={{padding:'18px 16px'}}>
          <p style={{fontSize:11,color:'var(--txt3)',marginBottom:4,textTransform:'uppercase',
            letterSpacing:'.1em',fontWeight:600}}>Purificadora Península</p>
          <h1 style={{fontSize:22,fontWeight:900,color:'var(--txt)',marginBottom:4}}>{p.nombre}</h1>
          <p style={{fontSize:13,color:'var(--blue)',fontWeight:600,marginBottom:14}}>{p.volumen}</p>
          <p style={{fontSize:13,color:'var(--txt2)',lineHeight:1.6,marginBottom:20}}>{p.descripcion}</p>

          {/* Selector cantidad */}
          <div style={{background:'var(--card)',border:'1px solid var(--border)',
            borderRadius:16,padding:16,marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <span style={{fontSize:13,color:'var(--txt2)',fontWeight:500}}>Cantidad</span>
              <div style={{display:'flex',alignItems:'center',gap:16}}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{
                  width:36,height:36,borderRadius:10,background:'var(--surface)',
                  border:'1px solid var(--border)',color:'var(--txt)',cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span dangerouslySetInnerHTML={{__html:SVG['minus']??''}} style={{display:'flex'}}/>
                </button>
                <span style={{fontSize:18,fontWeight:800,color:'var(--txt)',
                  width:28,textAlign:'center',fontFeatureSettings:"'tnum'"}}>{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} style={{
                  width:36,height:36,borderRadius:10,background:'var(--blue)',
                  border:'none',color:'white',cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span dangerouslySetInnerHTML={{__html:SVG['plus']??''}} style={{display:'flex'}}/>
                </button>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',
              paddingTop:12,borderTop:'1px solid var(--border)'}}>
              <span style={{fontSize:13,color:'var(--txt3)'}}>Total</span>
              <span style={{fontSize:22,fontWeight:900,color:'var(--txt)',
                fontFeatureSettings:"'tnum'"}}>${p.precio*qty}</span>
            </div>
          </div>

          {/* Pedido recurrente */}
          <div style={{background:'rgba(30,111,174,.08)',border:'1px solid rgba(30,111,174,.2)',
            borderRadius:14,padding:'12px 14px',marginBottom:20,
            display:'flex',gap:10,alignItems:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG['repeat']??''}}
              style={{display:'flex',color:'var(--blue)',flexShrink:0}}/>
            <div>
              <p style={{fontSize:12,fontWeight:700,color:'var(--blue)',marginBottom:2}}>Pedido recurrente</p>
              <p style={{fontSize:11,color:'var(--txt3)'}}>Recíbelo cada semana automáticamente. Sin cargos extra.</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA sticky */}
      <div style={{position:'fixed',
        bottom:'calc(56px + env(safe-area-inset-bottom,0px))',
        left:0,right:0,padding:'10px 14px',
        background:'rgba(6,15,8,.97)',backdropFilter:'blur(20px)',
        borderTop:'1px solid var(--border)',zIndex:90}}>
        <motion.button whileTap={{scale:.97}}
          onClick={()=>{
            for(let i=0;i<qty;i++) add({id:p.id,nombre:p.nombre,precio:p.precio})
            toast.success(`${qty}x ${p.nombre} al carrito`)
          }}
          style={{width:'100%',height:52,background:'var(--blue)',color:'white',
            fontWeight:800,fontSize:15,borderRadius:16,border:'none',cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          <span dangerouslySetInnerHTML={{__html:SVG['drop']??''}} style={{display:'flex'}}/>
          Agregar · ${p.precio*qty}
        </motion.button>
      </div>
      <BottomTab mode="cliente"/>
    </div>
  )
}

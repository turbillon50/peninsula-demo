'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import { BottomTab } from '@/components/bottom-tab'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'
import { toast } from 'sonner'
import { useState } from 'react'
import { Logo } from '@/components/logo'

export default function PedidoPage() {
  const {carrito,updateQty,remove,clear}=useStore()
  const {theme,toggle}=useTheme()
  const [dir,setDir]=useState('')
  const [tel,setTel]=useState('')
  const [nota,setNota]=useState('')
  const subtotal=carrito.reduce((a,c)=>a+c.precio*c.qty,0)

  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.96)',backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)'}}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 14px',gap:10}}>
          <Link href="/" style={{textDecoration:'none',flexShrink:0}}><Logo size={16}/></Link>
          <p style={{flex:1,fontSize:16,fontWeight:800,color:'var(--txt)'}}>Mi pedido</p>
          <button onClick={toggle} style={{width:36,height:36,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </button>
        </div>
      </header>
      <main style={{paddingTop:'calc(52px + env(safe-area-inset-top,0px))',
        paddingBottom:'calc(90px + 60px + env(safe-area-inset-bottom,0px))',
        padding:'calc(52px + env(safe-area-inset-top,0px)) 14px calc(90px + 60px + env(safe-area-inset-bottom,0px))'}}>
        {carrito.length===0?(
          <div style={{textAlign:'center',paddingTop:80}}>
            <div style={{width:80,height:80,borderRadius:24,
              background:'rgba(30,111,174,.1)',border:'1px solid rgba(30,111,174,.2)',
              margin:'0 auto 18px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span dangerouslySetInnerHTML={{__html:SVG['drop']??''}}
                style={{display:'flex',color:'var(--blue)',transform:'scale(1.5)'}}/>
            </div>
            <p style={{fontSize:16,fontWeight:600,color:'var(--txt2)',marginBottom:6}}>
              Pedido vacío
            </p>
            <p style={{fontSize:13,color:'var(--txt3)',marginBottom:24}}>
              Agrega productos desde el catálogo
            </p>
            <Link href="/catalogo" style={{background:'var(--blue)',color:'white',
              fontWeight:700,fontSize:14,padding:'12px 24px',borderRadius:12,
              textDecoration:'none',boxShadow:'0 3px 12px rgba(30,111,174,.4)'}}>
              Ver catálogo
            </Link>
          </div>
        ):(
          <>
            <AnimatePresence>
              {carrito.map(item=>(
                <motion.div key={item.id} initial={{opacity:0,x:-10}}
                  animate={{opacity:1,x:0}} exit={{opacity:0,x:10}} layout
                  style={{background:'var(--card)',border:'1px solid var(--border)',
                    borderRadius:14,padding:12,display:'flex',alignItems:'center',
                    gap:10,marginBottom:10,boxShadow:'0 2px 10px rgba(0,0,0,.2)'}}>
                  {/* Miniatura */}
                  <div style={{width:48,height:48,borderRadius:12,overflow:'hidden',flexShrink:0}}>
                    <img src={item.img??''} alt={item.nombre}
                      style={{width:'100%',height:'100%',objectFit:'cover'}}
                      onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:12,fontWeight:600,color:'var(--txt)',
                      overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:2}}>
                      {item.nombre}
                    </p>
                    <p style={{fontSize:11,color:'var(--txt3)',fontFeatureSettings:"'tnum'"}}>
                      ${item.precio} c/u
                    </p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <button onClick={()=>item.qty>1?updateQty(item.id,item.qty-1):remove(item.id)}
                      style={{width:28,height:28,borderRadius:8,background:'var(--surface)',
                        border:'1px solid var(--border)',color:'var(--txt)',
                        cursor:'pointer',display:'flex',alignItems:'center',
                        justifyContent:'center',fontSize:16}}>−</button>
                    <span style={{fontSize:14,fontWeight:700,color:'var(--txt)',
                      width:20,textAlign:'center'}}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.id,item.qty+1)}
                      style={{width:28,height:28,borderRadius:8,background:'var(--surface)',
                        border:'1px solid var(--border)',color:'var(--txt)',
                        cursor:'pointer',display:'flex',alignItems:'center',
                        justifyContent:'center',fontSize:16}}>+</button>
                  </div>
                  <span style={{fontSize:13,fontWeight:800,color:'var(--txt)',
                    minWidth:50,textAlign:'right',fontFeatureSettings:"'tnum'"}}>
                    ${item.precio*item.qty}
                  </span>
                  <button onClick={()=>remove(item.id)}
                    style={{background:'none',border:'none',color:'var(--txt3)',
                      cursor:'pointer',display:'flex',padding:4}}>
                    <span dangerouslySetInnerHTML={{__html:SVG['trash']??''}} style={{display:'flex'}}/>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div style={{background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:14,padding:14,marginTop:4}}>
              <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',marginBottom:12}}>
                Datos de entrega
              </p>
              <input value={dir} onChange={e=>setDir(e.target.value)}
                placeholder="Dirección de entrega..."
                style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',
                  borderRadius:10,padding:'11px 14px',fontSize:14,color:'var(--txt)',
                  outline:'none',marginBottom:10}}/>
              <input value={tel} onChange={e=>setTel(e.target.value)}
                placeholder="Teléfono de contacto"
                style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',
                  borderRadius:10,padding:'11px 14px',fontSize:14,color:'var(--txt)',
                  outline:'none',marginBottom:10}}/>
              <textarea value={nota} onChange={e=>setNota(e.target.value)}
                placeholder="Notas (ej: dejar con el vigilante)" rows={2}
                style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',
                  borderRadius:10,padding:'11px 14px',fontSize:14,color:'var(--txt)',
                  outline:'none',resize:'none',marginBottom:14}}/>
              <div style={{display:'flex',justifyContent:'space-between',
                fontSize:18,fontWeight:900,color:'var(--txt)',
                paddingTop:12,borderTop:'1px solid var(--border)',fontFeatureSettings:"'tnum'"}}>
                <span>Total</span>
                <span style={{color:'var(--blue)'}}>${subtotal}</span>
              </div>
            </div>
          </>
        )}
      </main>
      {carrito.length>0&&(
        <div style={{position:'fixed',
          bottom:'calc(60px + env(safe-area-inset-bottom,0px))',
          left:0,right:0,padding:'10px 14px',
          background:'rgba(6,15,8,.97)',backdropFilter:'blur(20px)',
          borderTop:'1px solid var(--border)',zIndex:90}}>
          <motion.button whileTap={{scale:.97}}
            onClick={()=>{
              if(!dir){toast.error('Ingresa tu dirección');return}
              toast.success('Pedido enviado. Llegará en 30-60 min.')
              clear()
            }}
            style={{width:'100%',height:52,background:'var(--blue)',color:'white',
              fontWeight:800,fontSize:15,borderRadius:16,border:'none',cursor:'pointer',
              boxShadow:'0 3px 16px rgba(30,111,174,.5)'}}>
            Confirmar pedido · ${subtotal}
          </motion.button>
        </div>
      )}
      <BottomTab mode="cliente"/>
    </div>
  )
}

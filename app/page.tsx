'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { PRODUCTOS, CATS } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { Logo } from '@/components/logo'
import { BottomTab } from '@/components/bottom-tab'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

const HERO = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_030916_bf319015-dd93-4c2e-be87-ae3a8641bef6.png"
const REP  = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_030916_dd3c63ef-b91d-43f0-aa92-8c04c5a631d5.png"

function Counter({end,suffix=''}: {end:number;suffix?:string}) {
  const [v,setV]=useState(0);const ref=useRef<HTMLSpanElement>(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return
      let cur=0;const step=end/60
      const t=setInterval(()=>{cur=Math.min(cur+step,end);setV(Math.round(cur));if(cur>=end)clearInterval(t)},16)
      obs.disconnect()
    },{threshold:.3})
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[end])
  return <span ref={ref}>{v.toLocaleString('es-MX')}{suffix}</span>
}

export default function HomePage() {
  const {theme,toggle}=useTheme()
  const carrito=useStore(s=>s.carrito)
  const total=carrito.reduce((a,c)=>a+c.qty,0)
  const router=useRouter()
  const [q,setQ]=useState('')

  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      {/* HEADER */}
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.97)',backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid var(--border)'}}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 14px',gap:10}}>
          <Logo size={18}/>
          <div style={{flex:1}}/>
          <button onClick={toggle} style={{width:38,height:38,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </button>
          <Link href="/pedido" style={{position:'relative',width:38,height:38,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            display:'flex',alignItems:'center',justifyContent:'center',
            textDecoration:'none',color:'var(--txt2)'}}>
            <span dangerouslySetInnerHTML={{__html:SVG['orders']??''}} style={{display:'flex'}}/>
            {total>0&&<span style={{position:'absolute',top:4,right:4,background:'var(--blue)',
              color:'white',fontSize:9,fontWeight:700,width:15,height:15,
              borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>{total}</span>}
          </Link>
          <Link href="/sign-in" style={{background:'var(--blue)',color:'white',
            fontWeight:700,fontSize:13,padding:'8px 14px',borderRadius:10,textDecoration:'none'}}>
            Ingresar
          </Link>
        </div>
        <div style={{padding:'0 14px 10px'}}>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',
              display:'flex',alignItems:'center',color:'var(--txt3)'}}
              dangerouslySetInnerHTML={{__html:SVG['search']??''}}/>
            <input value={q} onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&router.push('/catalogo?q='+q)}
              placeholder="Buscar agua, garrafones..."
              style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',
                borderRadius:12,paddingLeft:36,paddingRight:14,paddingTop:9,paddingBottom:9,
                fontSize:14,color:'var(--txt)',outline:'none'}}/>
          </div>
        </div>
      </header>

      {/* HERO Higgsfield */}
      <section style={{paddingTop:'calc(100px + env(safe-area-inset-top,0px))',
        position:'relative',height:'60vw',minHeight:260,maxHeight:340,overflow:'hidden'}}>
        <img src={HERO} alt="Agua pura"
          style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.45) saturate(1.2)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to bottom,rgba(2,10,5,.1) 0%,rgba(2,10,5,.88) 70%,var(--bg) 100%)'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',
          justifyContent:'flex-end',padding:'0 20px 24px'}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{duration:.5,ease:[.22,1,.36,1]}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,
              background:'rgba(30,111,174,.2)',border:'1px solid rgba(30,111,174,.4)',
              borderRadius:20,padding:'4px 12px',marginBottom:10}}>
              <span style={{width:6,height:6,borderRadius:3,background:'var(--blue)',
                animation:'pulse 2s infinite'}}/>
              <span style={{fontSize:11,fontWeight:600,color:'#7dd3fc'}}>
                Cancún, Q. Roo · Entrega 30-60 min
              </span>
            </div>
            <h1 style={{fontSize:'clamp(22px,6vw,34px)',fontWeight:900,color:'var(--txt)',
              lineHeight:1.1,letterSpacing:'-.5px',marginBottom:10}}>
              Agua purificada<br/>
              <span style={{color:'#1E6FAE'}}>a tu puerta</span>
            </h1>
            <div style={{display:'flex',gap:8}}>
              <Link href="/catalogo" style={{background:'var(--blue)',color:'white',
                fontWeight:700,fontSize:13,padding:'10px 18px',borderRadius:12,
                textDecoration:'none',display:'flex',alignItems:'center',gap:6,
                animation:'glowPulse 2s infinite'}}>
                Pedir agua
              </Link>
              <Link href="/sign-in" style={{background:'var(--surface)',color:'var(--txt)',
                fontWeight:600,fontSize:13,padding:'10px 18px',borderRadius:12,
                textDecoration:'none',border:'1px solid var(--border)'}}>
                Mi cuenta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:'var(--surface)',borderTop:'1px solid var(--border)',
        borderBottom:'1px solid var(--border)',padding:'14px 20px',
        display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,textAlign:'center'}}>
        {[{l:'Garrafones/sem',v:210,s:''},{l:'Clientes activos',v:48,s:''},{l:'Minutos entrega',v:45,s:''}].map(s=>(
          <div key={s.l}>
            <p style={{fontSize:22,fontWeight:900,color:'var(--blue)',letterSpacing:'-.5px',
              fontFeatureSettings:"'tnum'"}}>
              <Counter end={s.v} suffix={s.s}/>
            </p>
            <p style={{fontSize:9,color:'var(--txt3)',textTransform:'uppercase',
              letterSpacing:'.1em',marginTop:2}}>{s.l}</p>
          </div>
        ))}
      </section>

      {/* CATEGORÍAS con fotos Higgsfield — sin emojis */}
      <section style={{padding:'20px 14px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
          <p style={{fontSize:17,fontWeight:800,color:'var(--txt)'}}>¿Qué necesitas?</p>
          <Link href="/catalogo" style={{fontSize:12,color:'var(--blue)',textDecoration:'none',fontWeight:600}}>Ver todo</Link>
        </div>
        <div style={{display:'flex',gap:10,overflowX:'auto',scrollbarWidth:'none',paddingBottom:4}}>
          {CATS.map(c=>(
            <Link key={c.label} href={c.href} style={{
              flexShrink:0,width:110,background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:14,overflow:'hidden',textDecoration:'none'
            }}>
              {/* Imagen Higgsfield real */}
              <div style={{height:70,overflow:'hidden',position:'relative'}}>
                <img src={c.img} alt={c.label}
                  style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={{position:'absolute',inset:0,
                  background:'linear-gradient(to bottom,transparent 30%,rgba(6,15,8,.7) 100%)'}}/>
              </div>
              <div style={{padding:'8px 10px 10px'}}>
                <span style={{fontSize:11,fontWeight:700,color:'var(--txt)',display:'block',marginBottom:2}}>{c.label}</span>
                <span style={{fontSize:10,color:'var(--blue)',fontWeight:600}}>{c.sub}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section style={{padding:'24px 14px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
          <p style={{fontSize:17,fontWeight:800,color:'var(--txt)'}}>Populares</p>
          <Link href="/catalogo" style={{fontSize:12,color:'var(--blue)',textDecoration:'none',fontWeight:600}}>Ver todos</Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          {PRODUCTOS.filter(p=>p.popular).map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      {/* BANNER REPARTIDOR */}
      <section style={{margin:'24px 14px 0',borderRadius:18,overflow:'hidden',position:'relative',height:140}}>
        <img src={REP} alt="Repartidor"
          style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.5)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to right,rgba(2,10,5,.85) 0%,transparent 100%)'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',padding:'0 18px',gap:12}}>
          <span style={{fontSize:36}}>🛵</span>
          <div>
            <p style={{fontSize:15,fontWeight:800,color:'white',marginBottom:4}}>Entrega en 30 min</p>
            <p style={{fontSize:11,color:'rgba(255,255,255,.75)',marginBottom:8}}>Cancún y zona hotelera</p>
            <Link href="/catalogo" style={{fontSize:11,color:'#7dd3fc',fontWeight:700,textDecoration:'none'}}>
              Ordenar ahora →
            </Link>
          </div>
        </div>
      </section>

      {/* TODOS LOS PRODUCTOS */}
      <section style={{padding:'24px 14px 0'}}>
        <p style={{fontSize:17,fontWeight:800,color:'var(--txt)',marginBottom:12}}>Catálogo completo</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          {PRODUCTOS.map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      {/* CTA REGISTRO */}
      <section style={{margin:'24px 14px 0',background:'var(--card)',
        border:'1px solid var(--border)',borderRadius:18,padding:20,
        position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-30,right:-30,width:100,height:100,
          borderRadius:50,background:'var(--blue)',filter:'blur(40px)',opacity:.2}}/>
        <p style={{fontSize:18,fontWeight:800,color:'var(--txt)',marginBottom:6}}>
          💧 Suscríbete y ahorra
        </p>
        <p style={{fontSize:13,color:'var(--txt2)',marginBottom:16,lineHeight:1.5}}>
          Pedidos recurrentes automáticos. Recibe tu agua cada semana sin tener que ordenar.
        </p>
        <Link href="/sign-up" style={{display:'flex',alignItems:'center',justifyContent:'center',
          gap:8,background:'var(--blue)',color:'white',fontWeight:700,fontSize:14,
          padding:'12px',borderRadius:13,textDecoration:'none'}}>
          Crear cuenta gratis →
        </Link>
      </section>

      <div style={{height:32}}/>
      <BottomTab mode="cliente"/>
    </div>
  )
}

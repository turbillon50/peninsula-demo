'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { PRODUCTOS, CATS } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { Logo } from '@/components/logo'
import { BottomTab } from '@/components/bottom-tab'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'
import { useStore } from '@/lib/store'

const HERO = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_030916_bf319015-dd93-4c2e-be87-ae3a8641bef6.png"
const REP  = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_030916_dd3c63ef-b91d-43f0-aa92-8c04c5a631d5.png"

function Counter({end}: {end:number}) {
  const [v,setV]=useState(0)
  const ref=useRef<HTMLSpanElement>(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return
      let cur=0; const step=end/50
      const t=setInterval(()=>{cur=Math.min(cur+step,end);setV(Math.round(cur));if(cur>=end)clearInterval(t)},20)
      obs.disconnect()
    },{threshold:.3})
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[end])
  return <span ref={ref}>{v}</span>
}

export default function HomePage() {
  const {theme,toggle}=useTheme()
  const carrito=useStore(s=>s.carrito)
  const total=carrito.reduce((a,c)=>a+c.qty,0)
  const [q,setQ]=useState('')
  const router=useRouter()

  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>

      {/* HEADER */}
      <header style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.96)',
        backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)',
      }}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10}}>
          <Link href="/" style={{textDecoration:'none',flexShrink:0}}><Logo size={18}/></Link>
          <div style={{flex:1}}/>
          <button onClick={toggle}
            style={{width:38,height:38,borderRadius:11,border:'1px solid var(--border)',
              background:'var(--surface)',color:'var(--txt2)',cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </button>
          <Link href="/pedido" style={{position:'relative',width:38,height:38,borderRadius:11,
            border:'1px solid var(--border)',background:'var(--surface)',
            display:'flex',alignItems:'center',justifyContent:'center',
            textDecoration:'none',color:'var(--txt2)'}}>
            <span dangerouslySetInnerHTML={{__html:SVG['orders']??''}} style={{display:'flex'}}/>
            {total>0&&<span style={{position:'absolute',top:5,right:5,
              background:'var(--blue)',color:'white',fontSize:9,fontWeight:800,
              width:14,height:14,borderRadius:7,
              display:'flex',alignItems:'center',justifyContent:'center'}}>{total}</span>}
          </Link>
          <Link href="/sign-in" style={{
            background:'var(--blue)',color:'white',fontWeight:700,
            fontSize:13,padding:'8px 16px',borderRadius:11,textDecoration:'none',
            boxShadow:'0 2px 10px rgba(30,111,174,.4)'}}>
            Ingresar
          </Link>
        </div>
        <div style={{padding:'0 16px 10px'}}>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',
              display:'flex',color:'var(--txt3)'}}
              dangerouslySetInnerHTML={{__html:SVG['search']??''}}/>
            <input value={q} onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&router.push('/catalogo?q='+q)}
              placeholder="Buscar agua, garrafones..."
              style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',
                borderRadius:12,paddingLeft:36,paddingRight:12,paddingTop:9,paddingBottom:9,
                fontSize:14,color:'var(--txt)',outline:'none'}}/>
          </div>
        </div>
      </header>

      {/* HERO — imagen Higgsfield */}
      <section style={{
        paddingTop:'calc(100px + env(safe-area-inset-top,0px))',
        position:'relative',height:'62vw',minHeight:260,maxHeight:380,overflow:'hidden',
      }}>
        <img src={HERO} alt="Agua pura"
          style={{position:'absolute',inset:0,width:'100%',height:'100%',
            objectFit:'cover',filter:'brightness(.4) saturate(1.2)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to bottom,rgba(6,15,8,.1) 0%,rgba(6,15,8,.92) 80%,var(--bg) 100%)'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',
          justifyContent:'flex-end',padding:'0 20px 28px'}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{duration:.55,ease:[.22,1,.36,1]}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:7,
              background:'rgba(30,111,174,.18)',border:'1px solid rgba(30,111,174,.45)',
              borderRadius:20,padding:'5px 14px',marginBottom:14,backdropFilter:'blur(8px)'}}>
              <span style={{width:7,height:7,borderRadius:4,background:'#22d3ee',
                animation:'pulse 2s infinite'}}/>
              <span style={{fontSize:12,fontWeight:600,color:'#7dd3fc'}}>
                Cancún · Entrega 30-60 min
              </span>
            </div>
            <h1 style={{fontSize:'clamp(26px,7vw,38px)',fontWeight:900,color:'white',
              lineHeight:1.1,letterSpacing:'-.5px',marginBottom:10}}>
              Agua purificada<br/>
              <span style={{color:'var(--blue)'}}>a tu puerta</span>
            </h1>
            <div style={{display:'flex',gap:10,marginTop:4}}>
              <Link href="/catalogo" style={{
                background:'var(--blue)',color:'white',fontWeight:700,fontSize:14,
                padding:'11px 22px',borderRadius:14,textDecoration:'none',
                boxShadow:'0 3px 16px rgba(30,111,174,.5)',
                animation:'glowBlue 2.5s infinite'}}>
                Pedir agua
              </Link>
              <Link href="/sign-in" style={{
                background:'rgba(255,255,255,.1)',backdropFilter:'blur(8px)',
                color:'white',fontWeight:600,fontSize:14,
                padding:'11px 20px',borderRadius:14,textDecoration:'none',
                border:'1px solid rgba(255,255,255,.2)'}}>
                Mi cuenta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        background:'var(--surface)',
        borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',
        padding:'18px 20px',
        display:'grid',gridTemplateColumns:'repeat(3,1fr)',
        gap:8,textAlign:'center',
      }}>
        {[{l:'Garrafones/sem',v:210},{l:'Clientes activos',v:48},{l:'Min entrega',v:45}].map((s,i)=>(
          <motion.div key={s.l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:.2+i*.08}}>
            <p style={{fontSize:26,fontWeight:900,color:'var(--blue)',
              letterSpacing:'-.5px',fontFeatureSettings:"'tnum'",marginBottom:2}}>
              <Counter end={s.v}/>
            </p>
            <p style={{fontSize:9,color:'var(--txt3)',textTransform:'uppercase',letterSpacing:'.1em'}}>
              {s.l}
            </p>
          </motion.div>
        ))}
      </section>

      {/* CATEGORÍAS — scroll horizontal, fotos Higgsfield reales */}
      <section style={{padding:'24px 0 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',
          alignItems:'center',padding:'0 16px 14px'}}>
          <p style={{fontSize:18,fontWeight:800,color:'var(--txt)'}}>¿Qué necesitas?</p>
          <Link href="/catalogo" style={{fontSize:12,color:'var(--blue)',textDecoration:'none',fontWeight:600}}>
            Ver todo →
          </Link>
        </div>
        {/* Scroll snap horizontal */}
        <div style={{
          display:'flex',gap:12,
          overflowX:'auto',
          scrollSnapType:'x mandatory',
          padding:'4px 16px 16px',
          WebkitOverflowScrolling:'touch',
        }}>
          {CATS.map((c,i)=>(
            <motion.div key={c.label}
              initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
              transition={{delay:i*.08,duration:.4,ease:[.22,1,.36,1]}}
              style={{scrollSnapAlign:'start',flexShrink:0}}>
              <Link href={c.href} style={{
                display:'block',textDecoration:'none',
                width:130,borderRadius:18,overflow:'hidden',
                border:'1px solid var(--border)',
                boxShadow:'0 4px 16px rgba(0,0,0,.35)',
              }}>
                {/* Foto Higgsfield REAL */}
                <div style={{height:90,overflow:'hidden',position:'relative'}}>
                  <img src={c.img} alt={c.label}
                    style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,
                    background:'linear-gradient(to bottom,transparent 30%,rgba(6,15,8,.65) 100%)'}}/>
                </div>
                <div style={{background:'var(--card)',padding:'10px 12px 12px'}}>
                  <p style={{fontSize:12,fontWeight:700,color:'var(--txt)',marginBottom:2}}>{c.label}</p>
                  <p style={{fontSize:11,fontWeight:600,color:'var(--blue)'}}>{c.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPULARES */}
      <section style={{padding:'0 16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',
          alignItems:'center',marginBottom:14}}>
          <p style={{fontSize:18,fontWeight:800,color:'var(--txt)'}}>Populares</p>
          <Link href="/catalogo" style={{fontSize:12,color:'var(--blue)',textDecoration:'none',fontWeight:600}}>
            Ver todos →
          </Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}}>
          {PRODUCTOS.filter(p=>p.popular).map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*.1,duration:.4}}>
              <ProductCard p={p}/>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BANNER REPARTIDOR — foto Higgsfield real */}
      <section style={{margin:'28px 16px 0',borderRadius:20,overflow:'hidden',
        position:'relative',height:150,boxShadow:'0 6px 24px rgba(0,0,0,.4)'}}>
        <img src={REP} alt="Repartidor"
          style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.45)'}}/>
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to right,rgba(30,111,174,.7) 0%,rgba(6,15,8,.2) 100%)'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',
          padding:'0 20px',gap:16}}>
          <div style={{width:52,height:52,borderRadius:16,background:'rgba(255,255,255,.12)',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span dangerouslySetInnerHTML={{__html:SVG['truck']??''}}
              style={{display:'flex',color:'white',transform:'scale(1.2)'}}/>
          </div>
          <div>
            <p style={{fontSize:17,fontWeight:900,color:'white',marginBottom:3}}>Entrega en 30 min</p>
            <p style={{fontSize:12,color:'rgba(255,255,255,.75)',marginBottom:10}}>Cancún y zona hotelera</p>
            <Link href="/catalogo" style={{display:'inline-flex',alignItems:'center',gap:6,
              background:'white',color:'#1E6FAE',fontWeight:800,fontSize:12,
              padding:'7px 16px',borderRadius:10,textDecoration:'none'}}>
              Ordenar ahora →
            </Link>
          </div>
        </div>
      </section>

      {/* CATÁLOGO COMPLETO */}
      <section style={{padding:'28px 16px 0'}}>
        <p style={{fontSize:18,fontWeight:800,color:'var(--txt)',marginBottom:14}}>Catálogo completo</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}}>
          {PRODUCTOS.map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:'-40px'}} transition={{delay:i*.05,duration:.35}}>
              <ProductCard p={p}/>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA suscripción */}
      <section style={{margin:'28px 16px 0',
        background:'var(--card)',border:'1px solid var(--border)',
        borderRadius:20,padding:22,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-40,right:-40,width:120,height:120,
          borderRadius:60,background:'rgba(30,111,174,.2)',filter:'blur(28px)'}}/>
        <p style={{fontSize:11,color:'var(--blue)',fontWeight:700,textTransform:'uppercase',
          letterSpacing:'.12em',marginBottom:8}}>Ahorra tiempo</p>
        <p style={{fontSize:18,fontWeight:900,color:'var(--txt)',marginBottom:8,lineHeight:1.2}}>
          Pedido recurrente<br/>automático
        </p>
        <p style={{fontSize:13,color:'var(--txt2)',marginBottom:18,lineHeight:1.5}}>
          Recibe tu agua cada semana sin ordenar.
        </p>
        <Link href="/sign-up" style={{display:'flex',alignItems:'center',justifyContent:'center',
          background:'var(--blue)',color:'white',fontWeight:700,fontSize:14,
          padding:'12px',borderRadius:14,textDecoration:'none',
          boxShadow:'0 3px 14px rgba(30,111,174,.4)'}}>
          Crear cuenta gratis →
        </Link>
      </section>

      <div style={{height:32}}/>
      <BottomTab mode="cliente"/>
    </div>
  )
}

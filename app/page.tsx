'use client'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
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
  const [q,setQ]=useState('')
  const router=useRouter()
  const heroRef=useRef<HTMLDivElement>(null)
  const { scrollY }=useScroll()
  // Parallax sutil en el hero
  const heroY=useTransform(scrollY,[0,300],['0%','15%'])
  const heroOpacity=useTransform(scrollY,[0,250],[1,.3])

  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>

      {/* ── HEADER glass ── */}
      <header style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'var(--glass-bg)',
        backdropFilter:'var(--glass-blur)',
        WebkitBackdropFilter:'var(--glass-blur)',
        borderBottom:'1px solid var(--glass-border)',
      }}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10}}>
          <Link href="/" style={{textDecoration:'none',flexShrink:0}}><Logo size={18}/></Link>
          <div style={{flex:1}}/>
          <motion.button whileTap={{scale:.9}} onClick={toggle}
            style={{width:38,height:38,borderRadius:12,
              border:'1px solid var(--glass-border)',background:'var(--glass-bg)',
              color:'var(--txt2)',cursor:'pointer',display:'flex',
              alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </motion.button>
          <Link href="/pedido" style={{position:'relative',width:38,height:38,borderRadius:12,
            border:'1px solid var(--glass-border)',background:'var(--glass-bg)',
            display:'flex',alignItems:'center',justifyContent:'center',
            textDecoration:'none',color:'var(--txt2)'}}>
            <span dangerouslySetInnerHTML={{__html:SVG['orders']??''}} style={{display:'flex'}}/>
            {total>0&&(
              <motion.span initial={{scale:0}} animate={{scale:1}}
                style={{position:'absolute',top:4,right:4,background:'var(--blue)',
                  color:'white',fontSize:9,fontWeight:800,width:16,height:16,
                  borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',
                  boxShadow:'0 2px 6px rgba(30,111,174,.6)'}}>
                {total}
              </motion.span>
            )}
          </Link>
          <Link href="/sign-in" style={{
            background:'linear-gradient(135deg,#1E6FAE,#155789)',
            color:'white',fontWeight:700,fontSize:13,
            padding:'8px 16px',borderRadius:12,textDecoration:'none',
            boxShadow:'var(--shadow-blue)'}}>
            Ingresar
          </Link>
        </div>
        {/* Buscador */}
        <div style={{padding:'0 16px 10px'}}>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',
              display:'flex',alignItems:'center',color:'var(--txt3)'}}
              dangerouslySetInnerHTML={{__html:SVG['search']??''}}/>
            <input value={q} onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&router.push('/catalogo?q='+q)}
              placeholder="Buscar agua, garrafones..."
              style={{width:'100%',background:'var(--surface)',
                border:'1px solid var(--border)',borderRadius:14,
                paddingLeft:38,paddingRight:14,paddingTop:10,paddingBottom:10,
                fontSize:14,color:'var(--txt)',outline:'none'}}/>
          </div>
        </div>
      </header>

      {/* ── HERO con parallax ── */}
      <section ref={heroRef} style={{
        paddingTop:'calc(100px + env(safe-area-inset-top,0px))',
        position:'relative',height:'68vw',minHeight:300,maxHeight:400,overflow:'hidden'
      }}>
        <motion.img src={HERO} alt="Agua pura"
          style={{
            position:'absolute',inset:0,width:'100%',height:'115%',
            objectFit:'cover',filter:'brightness(.42) saturate(1.3)',
            y:heroY,
          }}/>
        {/* Gradiente dramático */}
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to bottom,rgba(2,10,5,.05) 0%,rgba(2,10,5,.4) 40%,rgba(2,10,5,.95) 85%,var(--bg) 100%)'}}/>
        {/* Glow azul ambient */}
        <div style={{position:'absolute',bottom:0,left:'10%',width:'80%',height:'60%',
          background:'radial-gradient(ellipse,rgba(30,111,174,.2) 0%,transparent 70%)',
          filter:'blur(20px)'}}/>
        <motion.div style={{
          position:'absolute',inset:0,display:'flex',flexDirection:'column',
          justifyContent:'flex-end',padding:'0 20px 28px',
          opacity:heroOpacity,
        }}>
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
            transition={{duration:.6,ease:[.22,1,.36,1]}}>
            {/* Badge pill */}
            <motion.div
              animate={{y:[0,-3,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
              style={{display:'inline-flex',alignItems:'center',gap:6,
                background:'rgba(30,111,174,.18)',border:'1px solid rgba(30,111,174,.4)',
                borderRadius:20,padding:'5px 14px',marginBottom:14,
                backdropFilter:'blur(8px)'}}>
              <span style={{width:7,height:7,borderRadius:4,background:'#22d3ee',
                animation:'pulse 2s infinite'}}/>
              <span style={{fontSize:12,fontWeight:600,color:'#7dd3fc'}}>
                Cancún, Q. Roo · 30-60 min
              </span>
            </motion.div>
            <h1 style={{fontSize:'clamp(26px,7vw,40px)',fontWeight:900,
              color:'white',lineHeight:1.08,letterSpacing:'-.5px',marginBottom:10}}>
              Agua purificada<br/>
              <span className="grad-txt">a tu puerta</span>
            </h1>
            <p style={{fontSize:14,color:'rgba(255,255,255,.65)',marginBottom:18,lineHeight:1.5}}>
              Garrafones 20L · Entrega en 30 min · Cancún
            </p>
            <div style={{display:'flex',gap:10}}>
              <motion.div whileTap={{scale:.95}}>
                <Link href="/catalogo" style={{
                  background:'linear-gradient(135deg,#1E6FAE,#155789)',
                  color:'white',fontWeight:800,fontSize:14,
                  padding:'12px 22px',borderRadius:16,textDecoration:'none',
                  display:'block',boxShadow:'0 4px 20px rgba(30,111,174,.5)',
                  animation:'glowPulse 2.5s infinite'}}>
                  💧 Pedir agua
                </Link>
              </motion.div>
              <Link href="/sign-in" style={{
                background:'rgba(255,255,255,.1)',backdropFilter:'blur(8px)',
                color:'white',fontWeight:600,fontSize:14,
                padding:'12px 20px',borderRadius:16,textDecoration:'none',
                border:'1px solid rgba(255,255,255,.2)'}}>
                Mi cuenta
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS glass ── */}
      <section style={{margin:'0 16px',transform:'translateY(-20px)'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{delay:.3,duration:.5}}
          className="glass"
          style={{borderRadius:20,padding:'16px 20px',
            display:'grid',gridTemplateColumns:'repeat(3,1fr)',
            gap:8,textAlign:'center',boxShadow:'var(--shadow-float)'}}>
          {[{l:'Garrafones/sem',v:210},{l:'Clientes activos',v:48},{l:'Min entrega',v:45}].map((s,i)=>(
            <motion.div key={s.l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              transition={{delay:.3+i*.1}}>
              <p style={{fontSize:24,fontWeight:900,letterSpacing:'-.5px',
                fontFeatureSettings:"'tnum'",marginBottom:2,
                background:'linear-gradient(135deg,#1E6FAE,#22d3ee)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                <Counter end={s.v}/>
              </p>
              <p style={{fontSize:9,color:'var(--txt3)',textTransform:'uppercase',
                letterSpacing:'.12em'}}>{s.l}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORÍAS — cards deslizables con foto Higgsfield ── */}
      <section style={{padding:'8px 0 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',
          alignItems:'center',padding:'0 16px',marginBottom:14}}>
          <p style={{fontSize:18,fontWeight:800,color:'var(--txt)'}}>¿Qué necesitas?</p>
          <Link href="/catalogo" style={{fontSize:12,color:'var(--blue)',
            textDecoration:'none',fontWeight:600}}>Ver todo →</Link>
        </div>
        {/* Scroll horizontal con snap */}
        <div className="scroll-x" style={{
          display:'flex',gap:12,padding:'4px 16px 16px',
        }}>
          {CATS.map((c,i)=>(
            <motion.div key={c.label}
              initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
              transition={{delay:i*.08,duration:.4,ease:[.22,1,.36,1]}}
              whileHover={{y:-4}} whileTap={{scale:.96}}>
              <Link href={c.href} style={{
                display:'block',textDecoration:'none',
                width:130,flexShrink:0,
                borderRadius:20,overflow:'hidden',
                boxShadow:'var(--shadow-card)',
                border:'1px solid var(--border)',
              }}>
                {/* Foto Higgsfield */}
                <div style={{height:90,overflow:'hidden',position:'relative'}}>
                  <img src={c.img} alt={c.label}
                    style={{width:'100%',height:'100%',objectFit:'cover',
                      transition:'transform .3s ease'}}/>
                  <div style={{position:'absolute',inset:0,
                    background:'linear-gradient(to bottom,transparent 20%,rgba(6,15,8,.75) 100%)'}}/>
                </div>
                {/* Label sobre gradiente */}
                <div style={{background:'var(--card)',padding:'10px 12px 12px'}}>
                  <p style={{fontSize:12,fontWeight:700,color:'var(--txt)',marginBottom:2}}>{c.label}</p>
                  <p style={{fontSize:11,fontWeight:600,
                    background:'linear-gradient(135deg,#1E6FAE,#22d3ee)',
                    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{c.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── POPULARES — grid con ProductCard (tiene modal) ── */}
      <section style={{padding:'0 16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',
          alignItems:'center',marginBottom:14}}>
          <p style={{fontSize:18,fontWeight:800,color:'var(--txt)'}}>Populares</p>
          <Link href="/catalogo" style={{fontSize:12,color:'var(--blue)',
            textDecoration:'none',fontWeight:600}}>Ver todos →</Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}}>
          {PRODUCTOS.filter(p=>p.popular).map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*.1,duration:.4,ease:[.22,1,.36,1]}}>
              <ProductCard p={p}/>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BANNER REPARTIDOR — glassmorphism ── */}
      <section style={{margin:'24px 16px 0'}}>
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          style={{
            borderRadius:24,overflow:'hidden',
            position:'relative',height:160,
            boxShadow:'var(--shadow-float)',
          }}>
          <img src={REP} alt="Repartidor"
            style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.45)'}}/>
          <div style={{position:'absolute',inset:0,
            background:'linear-gradient(135deg,rgba(30,111,174,.7) 0%,rgba(2,10,5,.2) 100%)'}}/>
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',
            padding:'0 20px',gap:14}}>
            <motion.div animate={{rotate:[0,5,-5,0]}}
              transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
              <span style={{fontSize:40}}>🛵</span>
            </motion.div>
            <div>
              <p style={{fontSize:18,fontWeight:900,color:'white',marginBottom:4,
                textShadow:'0 2px 8px rgba(0,0,0,.4)'}}>Entrega en 30 min</p>
              <p style={{fontSize:12,color:'rgba(255,255,255,.75)',marginBottom:12}}>
                Cancún y zona hotelera
              </p>
              <Link href="/catalogo" style={{
                display:'inline-flex',alignItems:'center',gap:6,
                background:'white',color:'#1E6FAE',fontWeight:800,
                fontSize:12,padding:'8px 16px',borderRadius:12,
                textDecoration:'none',boxShadow:'0 4px 12px rgba(0,0,0,.3)'}}>
                Ordenar ahora →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TODOS LOS PRODUCTOS ── */}
      <section style={{padding:'28px 16px 0'}}>
        <p style={{fontSize:18,fontWeight:800,color:'var(--txt)',marginBottom:14}}>
          Catálogo completo
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}}>
          {PRODUCTOS.map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:'-40px'}}
              transition={{delay:i*.06,duration:.4,ease:[.22,1,.36,1]}}>
              <ProductCard p={p}/>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA SUSCRIPCIÓN — glassmorphism ── */}
      <section style={{margin:'28px 16px 0'}}>
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="glass"
          style={{
            borderRadius:24,padding:22,position:'relative',overflow:'hidden',
            boxShadow:'var(--shadow-float)',
          }}>
          {/* Glow ambient */}
          <div style={{position:'absolute',top:-40,right:-40,width:130,height:130,
            borderRadius:65,background:'rgba(30,111,174,.25)',filter:'blur(30px)'}}/>
          <div style={{position:'absolute',bottom:-30,left:-30,width:100,height:100,
            borderRadius:50,background:'rgba(34,211,238,.12)',filter:'blur(24px)'}}/>
          <p style={{fontSize:11,color:'var(--blue)',fontWeight:700,textTransform:'uppercase',
            letterSpacing:'.12em',marginBottom:8}}>💡 Ahorra tiempo</p>
          <p style={{fontSize:19,fontWeight:900,color:'var(--txt)',marginBottom:8,
            lineHeight:1.2}}>Pedido recurrente<br/>automático</p>
          <p style={{fontSize:13,color:'var(--txt2)',marginBottom:18,lineHeight:1.5}}>
            Recibe tu agua cada semana sin tener que ordenar. Sin cargos extra.
          </p>
          <Link href="/sign-up" style={{
            display:'flex',alignItems:'center',justifyContent:'center',gap:8,
            background:'linear-gradient(135deg,#1E6FAE,#22d3ee)',
            color:'white',fontWeight:800,fontSize:14,
            padding:'13px',borderRadius:16,textDecoration:'none',
            boxShadow:'var(--shadow-blue)'}}>
            💧 Crear cuenta gratis →
          </Link>
        </motion.div>
      </section>

      <div style={{height:36}}/>
      <BottomTab mode="cliente"/>
    </div>
  )
}

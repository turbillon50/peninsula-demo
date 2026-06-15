'use client'
import { PEDIDOS } from '@/lib/data'
import { motion } from 'framer-motion'
import { BottomTab } from '@/components/bottom-tab'
import { Logo } from '@/components/logo'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'

const EST: Record<string,{c:string;bg:string;icon:string}> = {
  'Pendiente': {c:'var(--gold)',bg:'rgba(251,191,36,.12)',icon:'clock'},
  'En camino': {c:'var(--blue)',bg:'rgba(30,111,174,.12)',icon:'truck'},
  'Entregado': {c:'var(--green)',bg:'rgba(58,140,63,.12)',icon:'check'},
  'Cancelado': {c:'var(--red)',bg:'rgba(239,68,68,.12)',icon:'back'},
}

export default function PedidosPage() {
  const {theme,toggle}=useTheme()
  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.96)',backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)'}}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10}}>
          <Logo size={16}/>
          <p style={{flex:1,fontSize:16,fontWeight:800,color:'var(--txt)'}}>Mis pedidos</p>
          <button onClick={toggle} style={{width:36,height:36,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </button>
        </div>
      </header>
      <main className="page-app" style={{padding:'calc(56px + env(safe-area-inset-top,0px)) 14px calc(var(--tab-h) + env(safe-area-inset-bottom,0px) + 16px)'}}>
        <div style={{display:'flex',flexDirection:'column',gap:10,paddingTop:8}}>
          {PEDIDOS.map((q,i)=>{
            const e=EST[q.estado]??{c:'var(--txt3)',bg:'var(--surface)',icon:'orders'}
            return (
              <motion.div key={q.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                transition={{delay:i*.06}}
                style={{background:'var(--card)',border:'1px solid var(--border)',
                  borderRadius:16,padding:16,
                  boxShadow:'0 2px 12px rgba(0,0,0,.25)'}}>
                <div style={{display:'flex',justifyContent:'space-between',
                  alignItems:'center',marginBottom:8}}>
                  <span style={{fontSize:12,fontWeight:700,color:'var(--txt)',
                    fontFamily:'monospace'}}>{}</span>
                  <div style={{display:'flex',alignItems:'center',gap:6,
                    background:e.bg,borderRadius:20,padding:'4px 10px'}}>
                    <span dangerouslySetInnerHTML={{__html:SVG[e.icon]??''}}
                      style={{display:'flex',color:e.c,transform:'scale(.7)'}}/>
                    <span style={{fontSize:11,fontWeight:700,color:e.c}}>{q.estado}</span>
                  </div>
                </div>
                <p style={{fontSize:14,fontWeight:600,color:'var(--txt)',marginBottom:4}}>{q.productos}</p>
                <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:4}}>
                  <span dangerouslySetInnerHTML={{__html:SVG['pin']??''}}
                    style={{display:'flex',color:'var(--txt3)',transform:'scale(.85)'}}/>
                  <p style={{fontSize:11,color:'var(--txt3)',overflow:'hidden',
                    textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}}>{}</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <p style={{fontSize:11,color:'var(--txt3)'}}>{q.hora} · {q.repartidor}</p>
                  <p style={{fontSize:18,fontWeight:900,color:'var(--blue)',
                    fontFeatureSettings:"'tnum'"}}>${q.total}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>
      <BottomTab mode="cliente"/>
    </div>
  )
}

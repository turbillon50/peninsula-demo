'use client'
import { BottomTab } from '@/components/bottom-tab'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'

export default function CuentaPage() {
  const { theme, toggle } = useTheme()
  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.97)',backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)'}}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10}}>
          <Logo size={16}/>
          <p style={{flex:1,fontSize:16,fontWeight:800,color:'var(--txt)'}}>Mi cuenta</p>
          <button onClick={toggle} style={{width:36,height:36,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </button>
        </div>
      </header>
      <main style={{paddingTop:'calc(52px + env(safe-area-inset-top,0px))',
        paddingBottom:'calc(56px + env(safe-area-inset-bottom,0px) + 8px)',padding:
        'calc(52px + env(safe-area-inset-top,0px)) 14px calc(56px + env(safe-area-inset-bottom,0px) + 8px)'}}>
        <div style={{textAlign:'center',padding:'32px 0 24px'}}>
          <div style={{width:72,height:72,borderRadius:24,background:'var(--blue)',
            margin:'0 auto 12px',display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:32}}>💧</div>
          <p style={{fontSize:20,fontWeight:900,color:'var(--txt)'}}>Invitado</p>
          <p style={{fontSize:13,color:'var(--txt3)',marginTop:2}}>Inicia sesión para ver tus pedidos</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
          <Link href="/sign-in" style={{background:'var(--blue)',color:'white',fontWeight:700,
            fontSize:15,padding:'14px',borderRadius:14,textDecoration:'none',
            textAlign:'center',display:'block'}}>Iniciar sesión</Link>
          <Link href="/sign-up" style={{background:'var(--surface)',color:'var(--txt)',
            fontWeight:600,fontSize:15,padding:'14px',borderRadius:14,textDecoration:'none',
            textAlign:'center',border:'1px solid var(--border)',display:'block'}}>Crear cuenta gratis</Link>
        </div>
        <div style={{marginTop:24,background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:16,overflow:'hidden'}}>
          {[{l:'🚿 Pedido recurrente',s:'Recibe agua cada semana'},
            {l:'📍 Mis direcciones',s:'Guardar hasta 3 direcciones'},
            {l:'📦 Historial de pedidos',s:'Ver todos tus pedidos'},
            {l:'💬 Soporte WhatsApp',s:'+52 998 000 0000'},
          ].map((m,i,arr)=>(
            <div key={m.l} style={{padding:'14px 16px',
              borderBottom:i<arr.length-1?'1px solid var(--border)':'none',
              display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{m.l}</p>
                <p style={{fontSize:11,color:'var(--txt3)'}}>{m.s}</p>
              </div>
              <span style={{color:'var(--txt3)',fontSize:16}}>›</span>
            </div>
          ))}
        </div>
      </main>
      <BottomTab mode="cliente"/>
    </div>
  )
}

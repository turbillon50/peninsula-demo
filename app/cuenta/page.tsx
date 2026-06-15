'use client'
import { BottomTab } from '@/components/bottom-tab'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'

const MENU = [
  {icon:'repeat', label:'Pedido recurrente', sub:'Recibe agua cada semana'},
  {icon:'pin',    label:'Mis direcciones',   sub:'Guardar hasta 3 direcciones'},
  {icon:'orders', label:'Historial de pedidos', sub:'Ver todos tus pedidos'},
  {icon:'bell',   label:'Soporte WhatsApp',  sub:'+52 998 000 0000'},
]

export default function CuentaPage() {
  const {theme,toggle}=useTheme()
  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:100,
        paddingTop:'env(safe-area-inset-top,0px)',
        background:'rgba(6,15,8,.96)',backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border)'}}>
        <div style={{height:52,display:'flex',alignItems:'center',padding:'0 16px',gap:10}}>
          <Logo size={16}/>
          <p style={{flex:1,fontSize:16,fontWeight:800,color:'var(--txt)'}}>Mi cuenta</p>
          <button onClick={toggle} style={{width:36,height:36,borderRadius:10,
            border:'1px solid var(--border)',background:'var(--surface)',
            color:'var(--txt2)',cursor:'pointer',display:'flex',
            alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
          </button>
        </div>
      </header>
      <main className="page-app" style={{padding:'calc(56px + env(safe-area-inset-top,0px)) 16px calc(var(--tab-h) + env(safe-area-inset-bottom,0px) + 16px)'}}>
        {/* Avatar — SVG de gota, no emoji */}
        <div style={{textAlign:'center',padding:'32px 0 28px'}}>
          <div style={{width:76,height:76,borderRadius:24,
            background:'linear-gradient(135deg,rgba(30,111,174,.3),rgba(34,211,238,.15))',
            border:'1.5px solid rgba(30,111,174,.4)',
            margin:'0 auto 14px',
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span dangerouslySetInnerHTML={{__html:SVG['drop']??''}}
              style={{display:'flex',color:'var(--blue)',transform:'scale(1.4)'}}/>
          </div>
          <p style={{fontSize:20,fontWeight:900,color:'var(--txt)'}}>Invitado</p>
          <p style={{fontSize:13,color:'var(--txt3)',marginTop:3}}>Inicia sesión para ver tus pedidos</p>
        </div>
        {/* Botones auth */}
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
          <Link href="/sign-in" style={{display:'flex',alignItems:'center',justifyContent:'center',
            background:'var(--blue)',color:'white',fontWeight:700,fontSize:15,
            padding:'14px',borderRadius:14,textDecoration:'none',
            boxShadow:'0 3px 14px rgba(30,111,174,.4)'}}>
            Iniciar sesión
          </Link>
          <Link href="/sign-up" style={{display:'flex',alignItems:'center',justifyContent:'center',
            background:'var(--surface)',color:'var(--txt)',fontWeight:600,fontSize:15,
            padding:'14px',borderRadius:14,textDecoration:'none',
            border:'1px solid var(--border)'}}>
            Crear cuenta gratis
          </Link>
        </div>
        {/* Menú — SVG inline, no emojis */}
        <div style={{background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:18,overflow:'hidden'}}>
          {MENU.map((m,i,arr)=>(
            <div key={m.label} style={{padding:'14px 16px',
              borderBottom:i<arr.length-1?'1px solid var(--border)':'none',
              display:'flex',alignItems:'center',gap:12,cursor:'pointer'}}>
              <div style={{width:36,height:36,borderRadius:11,
                background:'rgba(30,111,174,.1)',border:'1px solid rgba(30,111,174,.15)',
                display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span dangerouslySetInnerHTML={{__html:SVG[m.icon]??''}}
                  style={{display:'flex',color:'var(--blue)',transform:'scale(.8)'}}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:13,fontWeight:600,color:'var(--txt)'}}>{m.label}</p>
                <p style={{fontSize:11,color:'var(--txt3)'}}>{m.sub}</p>
              </div>
              <span dangerouslySetInnerHTML={{__html:SVG['back']??''}}
                style={{display:'flex',color:'var(--txt3)',transform:'rotate(180deg) scale(.75)'}}/>
            </div>
          ))}
        </div>
      </main>
      <BottomTab mode="cliente"/>
    </div>
  )
}

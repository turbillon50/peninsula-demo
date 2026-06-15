'use client'
import Link from 'next/link'
import { Logo } from './logo'
import { SVG } from './svg'
import { useTheme } from '@/lib/theme'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function TopNav() {
  const { theme, toggle } = useTheme()
  const [q, setQ] = useState('')
  const router = useRouter()
  return (
    <header style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,
      paddingTop:'env(safe-area-inset-top,0px)',
      background:'rgba(6,15,8,.97)',
      backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
      borderBottom:'1px solid var(--border)',
    }}>
      <div style={{height:52,display:'flex',alignItems:'center',padding:'0 14px',gap:10}}>
        <Link href="/" style={{textDecoration:'none',flexShrink:0}}><Logo size={18}/></Link>
        <div style={{flex:1}}/>
        <button onClick={toggle} style={{width:38,height:38,borderRadius:10,
          border:'1px solid var(--border)',background:'var(--surface)',
          color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
        </button>
        <Link href="/sign-in" style={{background:'var(--blue)',color:'white',fontWeight:700,
          fontSize:13,padding:'8px 14px',borderRadius:10,textDecoration:'none'}}>Ingresar</Link>
      </div>
      <div style={{padding:'0 14px 10px'}}>
        <div style={{position:'relative'}}>
          <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',
            display:'flex',alignItems:'center',color:'var(--txt3)'}}
            dangerouslySetInnerHTML={{__html:SVG['search']??''}} />
          <input value={q} onChange={e=>setQ(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&router.push('/catalogo?q='+q)}
            placeholder="Buscar garrafones, botellas..."
            style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',
              borderRadius:12,paddingLeft:36,paddingRight:14,paddingTop:9,paddingBottom:9,
              fontSize:14,color:'var(--txt)',outline:'none'}}/>
        </div>
      </div>
    </header>
  )
}

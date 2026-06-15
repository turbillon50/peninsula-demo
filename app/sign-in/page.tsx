'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Logo } from '@/components/logo'
import { SVG } from '@/components/svg'
import { useTheme } from '@/lib/theme'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const { theme, toggle } = useTheme()
  const router = useRouter()
  const handleLogin = () => {
    if(!email||pass.length<3){toast.error('Datos inválidos');return}
    setLoading(true)
    setTimeout(()=>{
      if(email.includes('admin')) router.push('/admin')
      else if(email.includes('rep')) router.push('/rep')
      else router.push('/')
    },900)
  }
  return (
    <div className="page-bare" style={{background:'var(--bg)',minHeight:'100dvh',
      display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 20px 0'}}>
        <Link href="/" style={{color:'var(--txt3)',textDecoration:'none',
          display:'flex',alignItems:'center',gap:6,fontSize:13}}>
          <span dangerouslySetInnerHTML={{__html:SVG['back']??''}} style={{display:'flex'}}/>
          Volver
        </Link>
        <button onClick={toggle} style={{width:36,height:36,borderRadius:10,
          border:'1px solid var(--border)',background:'var(--surface)',
          color:'var(--txt2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span dangerouslySetInnerHTML={{__html:SVG[theme==='dark'?'sun':'moon']??''}} style={{display:'flex'}}/>
        </button>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',
        justifyContent:'center',padding:'0 24px 40px'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:.5,ease:[.22,1,.36,1]}}>
          <Logo size={24}/>
          <p style={{fontSize:13,color:'var(--txt3)',marginTop:6,marginBottom:36}}>
            Inicia sesión para pedir tu agua
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:20}}>
            <input value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="Email" type="email"
              style={{background:'var(--surface)',border:'1px solid var(--border)',
                borderRadius:14,padding:'14px 16px',fontSize:15,color:'var(--txt)',outline:'none'}}/>
            <input value={pass} onChange={e=>setPass(e.target.value)}
              placeholder="Contraseña" type="password"
              onKeyDown={e=>e.key==='Enter'&&handleLogin()}
              style={{background:'var(--surface)',border:'1px solid var(--border)',
                borderRadius:14,padding:'14px 16px',fontSize:15,color:'var(--txt)',outline:'none'}}/>
          </div>
          <motion.button whileTap={{scale:.97}} onClick={handleLogin} disabled={loading}
            style={{width:'100%',height:54,background:'var(--blue)',color:'white',
              fontWeight:800,fontSize:15,borderRadius:16,border:'none',cursor:'pointer',opacity:loading?.7:1}}>
            {loading?'Verificando...':'Ingresar 💧'}
          </motion.button>
          <div style={{marginTop:16,padding:14,background:'var(--surface)',
            border:'1px solid var(--border)',borderRadius:12,fontSize:11,
            color:'var(--txt3)',lineHeight:1.9}}>
            <strong style={{color:'var(--txt2)'}}>Demo:</strong><br/>
            admin@... → Panel Admin<br/>
            rep@... → Panel Repartidor<br/>
            otro → Cliente
          </div>
          <p style={{textAlign:'center',fontSize:13,color:'var(--txt3)',marginTop:16}}>
            ¿No tienes cuenta?{' '}
            <Link href="/sign-up" style={{color:'var(--blue)',fontWeight:600,textDecoration:'none'}}>
              Registrarse
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

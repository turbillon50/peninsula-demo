'use client'
import { useStore } from '@/lib/store'
import type { Producto } from '@/lib/data'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SVG } from './svg'
import { toast } from 'sonner'

export function ProductCard({ p, onAdd }: { p: Producto; onAdd?: () => void }) {
  const add = useStore(s => s.addItem)
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
      transition={{duration:.25,ease:[.22,1,.36,1]}}
      style={{background:'var(--card)',border:'1px solid var(--border)',
        borderRadius:14,overflow:'hidden'}}>
      {/* Imagen Higgsfield real */}
      <Link href={'/producto/'+p.id} style={{display:'block',textDecoration:'none'}}>
        <div style={{position:'relative',paddingTop:'68%',background:'var(--surface)',overflow:'hidden'}}>
          <img src={p.img} alt={p.nombre}
            style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
          <div style={{position:'absolute',inset:0,
            background:'linear-gradient(to bottom,transparent 50%,rgba(6,15,8,.7) 100%)'}}/>
          {p.popular&&<div style={{position:'absolute',top:8,left:8,
            background:'var(--blue)',color:'white',fontSize:9,fontWeight:700,
            padding:'2px 8px',borderRadius:20}}>⭐ Popular</div>}
          <div style={{position:'absolute',bottom:8,right:8,
            background:'rgba(6,15,8,.85)',color:'var(--txt)',
            fontSize:16,fontWeight:900,padding:'3px 10px',borderRadius:20,
            fontFeatureSettings:"'tnum'"}}>
            ${p.precio}
          </div>
        </div>
      </Link>
      <div style={{padding:'10px 12px 12px'}}>
        <Link href={'/producto/'+p.id} style={{textDecoration:'none'}}>
          <p style={{fontSize:13,fontWeight:700,color:'var(--txt)',marginBottom:2}}>{p.nombre}</p>
          <p style={{fontSize:11,color:'var(--txt3)',marginBottom:8}}>{p.volumen}</p>
        </Link>
        <div style={{display:'flex',gap:6}}>
          <Link href={'/producto/'+p.id} style={{flex:1,height:34,background:'var(--surface)',
            color:'var(--txt2)',fontWeight:600,fontSize:11,borderRadius:9,
            border:'1px solid var(--border)',textDecoration:'none',
            display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
            Ver
          </Link>
          <motion.button whileTap={{scale:.94}}
            onClick={()=>{add({id:p.id,nombre:p.nombre,precio:p.precio});
              toast.success('Agregado',{description:p.nombre});onAdd?.()}}
            style={{flex:2,height:34,background:'var(--blue)',color:'white',fontWeight:700,
              fontSize:11,borderRadius:9,border:'none',cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',gap:4,
              animation:'glowPulse 2s infinite'}}>
            <span dangerouslySetInnerHTML={{__html:SVG['plus']??''}} style={{display:'flex',transform:'scale(.85)'}}/>
            Pedir
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

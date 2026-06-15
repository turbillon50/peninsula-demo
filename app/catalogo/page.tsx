'use client'
import { Suspense, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PRODUCTOS } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { TopNav } from '@/components/top-nav'
import { BottomTab } from '@/components/bottom-tab'

function Content() {
  const params = useSearchParams()
  const [q, setQ] = useState(params.get('q')||'')
  const filtered = useMemo(()=>PRODUCTOS.filter(p=>
    !q||p.nombre.toLowerCase().includes(q.toLowerCase())
  ),[q])
  return (
    <div style={{background:'var(--bg)',minHeight:'100dvh'}}>
      <TopNav/>
      <main className="page-main">
        <div style={{padding:'0 14px'}}>
          <p style={{fontSize:12,color:'var(--txt3)',marginBottom:14}}>
            {filtered.length} productos disponibles
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
            {filtered.map((p,i)=>(
              <motion.div key={p.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                transition={{delay:i*.04,duration:.25}}>
                <ProductCard p={p}/>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <BottomTab mode="cliente"/>
    </div>
  )
}
export default function CatalogoPage() { return <Suspense><Content/></Suspense> }

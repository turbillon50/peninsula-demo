'use client'
import { toast } from 'sonner'
import { SVG } from '@/components/svg'

const TOGGLES = [
  {icon:'bell',   label:'Notificaciones por WhatsApp'},
  {icon:'orders', label:'Reporte semanal por email'},
  {icon:'truck',  label:'Alertas de repartidor'},
]

export default function AdminConfigPage() {
  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:12}}>
      {[
        {l:'Nombre del negocio',v:'Purificadora Península'},
        {l:'Teléfono',v:'+52 998 000 0000'},
        {l:'Ciudad',v:'Cancún, Q. Roo'},
        {l:'Tiempo de entrega (min)',v:'30-60'},
        {l:'Precio garrafón 20L',v:'$30'},
      ].map(f=>(
        <div key={f.l}>
          <label style={{fontSize:10,color:'var(--txt3)',textTransform:'uppercase',
            letterSpacing:'.1em',display:'block',marginBottom:6}}>{f.l}</label>
          <input defaultValue={f.v}
            style={{width:'100%',background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:12,padding:'12px 14px',fontSize:14,color:'var(--txt)',outline:'none'}}/>
        </div>
      ))}
      <button onClick={()=>toast.success('Configuración guardada')}
        style={{background:'var(--blue)',color:'white',fontWeight:700,fontSize:14,
          height:48,borderRadius:14,border:'none',cursor:'pointer',marginTop:4,
          boxShadow:'0 3px 12px rgba(30,111,174,.4)'}}>
        Guardar cambios
      </button>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',
        borderRadius:16,overflow:'hidden',marginTop:8}}>
        {TOGGLES.map((t,i,arr)=>(
          <div key={t.label} style={{padding:'14px 16px',
            borderBottom:i<arr.length-1?'1px solid var(--border)':'none',
            display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:34,height:34,borderRadius:10,
              background:'rgba(30,111,174,.1)',border:'1px solid rgba(30,111,174,.15)',
              display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span dangerouslySetInnerHTML={{__html:SVG[t.icon]??''}}
                style={{display:'flex',color:'var(--blue)',transform:'scale(.75)'}}/>
            </div>
            <span style={{flex:1,fontSize:13,color:'var(--txt)'}}>{t.label}</span>
            <div style={{width:44,height:26,background:'var(--blue)',borderRadius:13,
              position:'relative',cursor:'pointer',flexShrink:0}}>
              <div style={{position:'absolute',right:3,top:3,width:20,height:20,
                background:'white',borderRadius:10}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

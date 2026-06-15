export function Logo({ size=20 }: { size?: number }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      {/* Gota de agua del logo */}
      <svg width={size} height={size*1.2} viewBox="0 0 40 48" fill="none">
        <path d="M20 2 C20 2 4 18 4 30 a16 16 0 0 0 32 0 C36 18 20 2 20 2z"
          fill="#1E6FAE" />
        <path d="M20 8 C20 8 10 22 10 30 a10 10 0 0 0 8 9.8"
          fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
      </svg>
      <div>
        <span style={{ fontSize:size*.8, fontWeight:900, color:'var(--txt)',
          letterSpacing:'-.03em', lineHeight:1 }}>Península</span>
        <span style={{ display:'block', fontSize:size*.4, fontWeight:500,
          color:'var(--txt3)', letterSpacing:'.08em', textTransform:'uppercase' }}>
          Purificadora
        </span>
      </div>
    </div>
  )
}

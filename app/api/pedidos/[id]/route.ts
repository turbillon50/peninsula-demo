import { NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(_: Request, ctx: any) {
  const id = ctx?.params?.id
  const [p] = await sql`SELECT * FROM peninsula.pedidos WHERE id = ${id}::uuid`
  if (!p) return NextResponse.json({ error:'not found' }, { status:404 })
  return NextResponse.json(p)
}

export async function PATCH(req: Request, ctx: any) {
  const id = ctx?.params?.id
  const body = await req.json()
  const { estado, repartidor_id, repartidor_nombre } = body
  let updated: any
  if (repartidor_id) {
    ;[updated] = await sql`
      UPDATE peninsula.pedidos
      SET estado = COALESCE(${estado ?? null}, estado),
          repartidor_id = ${repartidor_id}::uuid,
          repartidor_nombre = ${repartidor_nombre}
      WHERE id = ${id}::uuid RETURNING *`
  } else {
    ;[updated] = await sql`
      UPDATE peninsula.pedidos SET estado = ${estado}
      WHERE id = ${id}::uuid RETURNING *`
  }
  if (updated && (estado === 'En camino' || repartidor_id)) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://peninsula-demo-umber.vercel.app'
    fetch(appUrl + '/api/whatsapp', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ to: updated.cliente_tel,
        mensaje: 'Tu pedido ' + updated.folio + ' esta en camino con ' + (updated.repartidor_nombre ?? 'nuestro equipo') + '. Llega en aprox 30 min. - Purificadora Peninsula.'
      })
    }).catch(()=>{})
  }
  return NextResponse.json(updated)
}

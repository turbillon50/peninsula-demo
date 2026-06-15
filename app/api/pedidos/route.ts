import { NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado')
  const repId  = searchParams.get('repartidor_id')
  let rows
  if (estado) {
    rows = await sql`SELECT * FROM peninsula.pedidos WHERE estado = ${estado} ORDER BY created_at DESC`
  } else if (repId) {
    rows = await sql`SELECT * FROM peninsula.pedidos WHERE repartidor_id = ${repId}::uuid AND estado != 'Entregado' ORDER BY created_at DESC`
  } else {
    rows = await sql`SELECT * FROM peninsula.pedidos ORDER BY created_at DESC LIMIT 60`
  }
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { cliente_nombre, cliente_tel, direccion, nota, items, total } = body
  const [pedido] = await sql`
    INSERT INTO peninsula.pedidos (cliente_nombre, cliente_tel, direccion, nota, items, total)
    VALUES (${cliente_nombre}, ${cliente_tel}, ${direccion}, ${nota ?? ''}, ${JSON.stringify(items)}, ${total})
    RETURNING *
  `
  // WhatsApp async (no bloquea)
  fetch(new URL('/api/whatsapp', process.env.NEXT_PUBLIC_APP_URL ?? 'https://peninsula-demo-umber.vercel.app').href, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ to: cliente_tel,
      mensaje: "Hola " + cliente_nombre + ", recibimos tu pedido *" + pedido.folio + "* de $" + total + " MXN. Lo preparamos ahora — entrega en 30-60 min. Purifcadora Peninsula."
    })
  }).catch(()=>{})
  return NextResponse.json(pedido, { status: 201 })
}

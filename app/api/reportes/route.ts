import { NextResponse } from 'next/server'
import sql from '@/lib/db'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const dias = searchParams.get('periodo') === '30d' ? 30 : searchParams.get('periodo') === '1d' ? 1 : 7
  const [resumen] = await sql`
    SELECT
      COUNT(*) FILTER (WHERE estado != 'Cancelado') AS total_pedidos,
      COUNT(*) FILTER (WHERE estado = 'Entregado') AS entregados,
      COUNT(*) FILTER (WHERE estado = 'Pendiente') AS pendientes,
      COALESCE(SUM(total) FILTER (WHERE estado = 'Entregado'),0) AS ingreso_total,
      COALESCE(ROUND(AVG(total) FILTER (WHERE estado = 'Entregado')),0) AS ticket_promedio
    FROM peninsula.pedidos
    WHERE created_at >= NOW() - (${dias} || ' days')::INTERVAL`
  const porDia = await sql`
    SELECT DATE(created_at) AS dia, COUNT(*) AS pedidos, COALESCE(SUM(total),0) AS ingreso
    FROM peninsula.pedidos
    WHERE created_at >= NOW() - (${dias} || ' days')::INTERVAL AND estado != 'Cancelado'
    GROUP BY DATE(created_at) ORDER BY dia ASC`
  const topProductos = await sql`
    SELECT item->>'nombre' AS nombre, SUM((item->>'qty')::int) AS total_uds
    FROM peninsula.pedidos, jsonb_array_elements(items) AS item
    WHERE estado='Entregado' AND created_at >= NOW() - (${dias} || ' days')::INTERVAL
    GROUP BY item->>'nombre' ORDER BY total_uds DESC LIMIT 5`
  return NextResponse.json({ resumen, porDia, topProductos })
}

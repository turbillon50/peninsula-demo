import { NextResponse } from 'next/server'
import sql from '@/lib/db'
export async function GET() {
  const rows = await sql`SELECT * FROM peninsula.repartidores WHERE activo = true ORDER BY nombre`
  return NextResponse.json(rows)
}

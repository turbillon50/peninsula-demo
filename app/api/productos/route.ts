import { NextResponse } from 'next/server'
import sql from '@/lib/db'
export async function GET() {
  const rows = await sql`SELECT * FROM peninsula.productos WHERE activo = true ORDER BY popular DESC`
  return NextResponse.json(rows)
}

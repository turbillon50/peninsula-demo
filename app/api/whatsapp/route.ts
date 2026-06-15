import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  const { to, mensaje } = await req.json()
  const sid   = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from  = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886'
  if (!sid || sid === 'DEMO_SID') {
    console.log('[WA DEMO] to=' + to + ' msg=' + mensaje)
    return NextResponse.json({ ok:true, demo:true })
  }
  const res = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json', {
    method:'POST',
    headers:{ 'Authorization':'Basic ' + Buffer.from(sid + ':' + token).toString('base64'),
              'Content-Type':'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ From:from, To:'whatsapp:'+to, Body:mensaje }).toString(),
  })
  const data = await res.json()
  return NextResponse.json({ ok:res.ok, sid:data.sid })
}

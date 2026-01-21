import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Hello from Next.js API!',
    timestamp: new Date().toISOString(),
    success: true,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  return NextResponse.json({
    message: '데이터를 성공적으로 받았습니다',
    receivedData: body,
    success: true,
  })
}

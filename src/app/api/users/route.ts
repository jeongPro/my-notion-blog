import { NextResponse } from 'next/server'

// 예제 데이터
const mockUsers = [
  { id: 1, name: '김철수', email: 'kim@example.com' },
  { id: 2, name: '이영희', email: 'lee@example.com' },
  { id: 3, name: '박민수', email: 'park@example.com' },
]

export async function GET() {
  // 실제로는 여기서 데이터베이스 조회
  return NextResponse.json({
    data: mockUsers,
    success: true,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // 실제로는 여기서 데이터베이스에 저장
  const newUser = {
    id: mockUsers.length + 1,
    ...body,
  }

  return NextResponse.json({
    data: newUser,
    message: '사용자가 생성되었습니다',
    success: true,
  })
}

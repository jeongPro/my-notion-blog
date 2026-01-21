const fs = require('fs')
const path = require('path')

const apiName = process.argv[2]

if (!apiName) {
  console.error('❌ 사용법: npm run scaffold:api <api-name>')
  console.error('예시: npm run scaffold:api products')
  process.exit(1)
}

// API 이름 검증 (알파벳, 숫자, 하이픈만 허용)
if (!/^[a-z0-9-]+$/.test(apiName)) {
  console.error('❌ API 이름은 소문자, 숫자, 하이픈만 사용 가능합니다.')
  process.exit(1)
}

const apiDir = path.join('src', 'app', 'api', apiName)

// 이미 존재하는지 확인
if (fs.existsSync(apiDir)) {
  console.error(`❌ /api/${apiName} 라우트가 이미 존재합니다.`)
  process.exit(1)
}

// 디렉토리 생성
fs.mkdirSync(apiDir, { recursive: true })

// API 이름을 복수형으로 표시 (예: product -> products)
const displayName = apiName.charAt(0).toUpperCase() + apiName.slice(1)

// route.ts 템플릿
const routeTemplate = `import { NextResponse } from 'next/server'

// GET /api/${apiName}
export async function GET() {
  try {
    // TODO: 데이터베이스 조회 로직
    const data = [
      { id: 1, name: 'Sample ${displayName} 1' },
      { id: 2, name: 'Sample ${displayName} 2' },
    ]

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch ${apiName}',
      },
      { status: 500 }
    )
  }
}

// POST /api/${apiName}
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // TODO: 유효성 검증 (Zod 사용 권장)
    // TODO: 데이터베이스 저장 로직

    return NextResponse.json(
      {
        success: true,
        data: { id: Date.now(), ...body },
        message: '${displayName} created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create ${apiName}',
      },
      { status: 500 }
    )
  }
}

// PUT /api/${apiName}
export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // TODO: 유효성 검증
    // TODO: 데이터베이스 업데이트 로직

    return NextResponse.json({
      success: true,
      data: body,
      message: '${displayName} updated successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update ${apiName}',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/${apiName}
export async function DELETE(request: Request) {
  try {
    // TODO: ID 추출 및 유효성 검증
    // TODO: 데이터베이스 삭제 로직

    return NextResponse.json({
      success: true,
      message: '${displayName} deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete ${apiName}',
      },
      { status: 500 }
    )
  }
}
`

fs.writeFileSync(path.join(apiDir, 'route.ts'), routeTemplate)
console.log(`✓ api/${apiName}/route.ts 생성 완료`)

console.log(`
✅ API 라우트 생성 완료!

📂 생성된 파일:
   src/app/api/${apiName}/route.ts

🌐 API 엔드포인트:
   GET    http://localhost:3000/api/${apiName}
   POST   http://localhost:3000/api/${apiName}
   PUT    http://localhost:3000/api/${apiName}
   DELETE http://localhost:3000/api/${apiName}

💡 다음 단계:
   1. route.ts의 TODO 주석 부분 구현
   2. Zod로 유효성 검증 추가
   3. Prisma 또는 DB 연결 추가
   4. 브라우저나 Postman으로 API 테스트
`)

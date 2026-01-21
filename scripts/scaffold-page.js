const fs = require('fs')
const path = require('path')

const pageName = process.argv[2]

if (!pageName) {
  console.error('❌ 사용법: npm run scaffold:page <page-name>')
  console.error('예시: npm run scaffold:page blog')
  process.exit(1)
}

// 페이지 이름 검증 (알파벳, 숫자, 하이픈만 허용)
if (!/^[a-z0-9-]+$/.test(pageName)) {
  console.error(
    '❌ 페이지 이름은 소문자, 숫자, 하이픈만 사용 가능합니다.'
  )
  process.exit(1)
}

const pageDir = path.join('src', 'app', pageName)

// 이미 존재하는지 확인
if (fs.existsSync(pageDir)) {
  console.error(`❌ ${pageName} 페이지가 이미 존재합니다.`)
  process.exit(1)
}

// 디렉토리 생성
fs.mkdirSync(pageDir, { recursive: true })

// 페이지 이름을 PascalCase로 변환 (예: blog-post -> BlogPost)
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

const componentName = toPascalCase(pageName)
const displayName = pageName
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')

// page.tsx 템플릿
const pageTemplate = `export default function ${componentName}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">${displayName}</h1>
      <p className="text-lg text-muted-foreground">
        ${displayName} 페이지입니다.
      </p>
    </div>
  )
}
`

fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageTemplate)
console.log(`✓ ${pageName}/page.tsx 생성 완료`)

console.log(`
✅ 페이지 생성 완료!

📂 생성된 파일:
   src/app/${pageName}/page.tsx

🌐 접속 경로:
   http://localhost:3000/${pageName}

💡 다음 단계:
   1. npm run dev 로 개발 서버 실행
   2. 브라우저에서 /${pageName} 경로 확인
`)

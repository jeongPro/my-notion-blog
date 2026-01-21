# Next.js Starter Kit

빠른 프로토타이핑과 프로덕션 배포를 위한 최적화된 Next.js 스타터 킷입니다.

## 🚀 주요 기능

- ⚡️ **Next.js 15** - 최신 App Router와 Server Components
- 🎨 **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- 🧩 **shadcn/ui** - 커스터마이징 가능한 컴포넌트 라이브러리
- 📝 **TypeScript** - 타입 안정성
- 🎭 **다크 모드** - next-themes 기반 테마 전환
- 📋 **React Hook Form + Zod** - 강력한 폼 유효성 검증
- 🔄 **React Query** - 효율적인 데이터 페칭 및 캐싱
- 🗂️ **Zustand** - 간단한 상태 관리
- 🎯 **ESLint + Prettier** - 일관된 코드 스타일
- 🔧 **완전한 커스터마이징** - 모든 컴포넌트와 스타일 수정 가능

## 📦 기술 스택

### 코어
- Next.js 15 (App Router)
- React 19
- TypeScript 5

### UI/스타일링
- Tailwind CSS
- shadcn/ui (Radix UI)
- Lucide React (아이콘)
- next-themes (다크모드)

### 데이터 관리
- TanStack Query (React Query)
- Zustand
- React Hook Form
- Zod

## 🛠️ 시작하기

### 설치

\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 환경 변수 설정

\`\`\`bash
# .env.local 파일 생성
cp .env.local.example .env.local
\`\`\`

## 📂 프로젝트 구조

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── examples/          # 예제 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 글로벌 스타일
├── components/
│   ├── ui/                # shadcn/ui 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── providers/         # 컨텍스트 프로바이더
├── lib/
│   ├── utils.ts           # 유틸리티 함수
│   └── api.ts             # API 클라이언트
├── hooks/                 # 커스텀 훅
├── store/                 # Zustand 스토어
└── types/                 # TypeScript 타입
\`\`\`

## 📖 예제 페이지

프로젝트에는 다음 예제가 포함되어 있습니다:

- `/` - 홈페이지 (랜딩 페이지)
- `/examples` - 예제 목록
- `/examples/ui-components` - UI 컴포넌트 갤러리
- `/examples/forms` - React Hook Form + Zod 폼 예제
- `/examples/data-fetching` - API 데이터 페칭 예제
- `/api/hello` - API 라우트 예제
- `/api/users` - 사용자 API 예제

## 🎨 UI 커스터마이징

### Tailwind 설정

\`tailwind.config.ts\`에서 색상, 폰트, 간격 등을 자유롭게 커스터마이징할 수 있습니다:

\`\`\`typescript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#your-color',
      }
    }
  }
}
\`\`\`

### shadcn/ui 컴포넌트 추가

\`\`\`bash
# 원하는 컴포넌트 추가
npx shadcn@latest add [component-name]

# 예: Dialog 컴포넌트 추가
npx shadcn@latest add dialog
\`\`\`

컴포넌트는 \`src/components/ui\`에 복사되어 직접 수정할 수 있습니다.

## 🚢 배포

### Vercel (추천)

\`\`\`bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
\`\`\`

또는 [Vercel Dashboard](https://vercel.com)에서 GitHub 저장소를 연결하여 자동 배포할 수 있습니다.

### 기타 플랫폼

- **Netlify** - Next.js를 지원합니다
- **Docker** - 컨테이너화하여 배포 가능
- **AWS/GCP** - 클라우드 플랫폼에 배포 가능

## 📝 스크립트

### 기본 스크립트

\`\`\`bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 체크
npm run format       # Prettier 포맷팅
\`\`\`

### ⚡ 커스텀 커맨드

#### 컴포넌트 빠른 추가

\`\`\`bash
# 단일 컴포넌트 추가
npm run component:add dialog

# 자주 사용하는 컴포넌트 일괄 추가
npm run component:all

# 폼 관련 컴포넌트 일괄 추가
npm run component:form
\`\`\`

#### 페이지/API 스캐폴딩

\`\`\`bash
# 새 페이지 생성
npm run scaffold:page blog
# → src/app/blog/page.tsx 생성

# 새 API 라우트 생성
npm run scaffold:api products
# → src/app/api/products/route.ts 생성 (GET, POST, PUT, DELETE)
\`\`\`

#### 프로젝트 클린업

\`\`\`bash
# 빌드 파일만 삭제
npm run clean

# 빌드 파일 + 캐시 삭제
npm run clean:cache

# 완전 초기화 (node_modules 포함)
npm run clean:all

# 완전 재설치
npm run fresh

# 빌드 삭제 후 개발 서버 재시작
npm run reset
\`\`\`

#### 코드 품질 점검

\`\`\`bash
# 타입 체크 + Lint
npm run check

# 자동 수정 (Format + Lint Fix)
npm run check:fix

# 배포 전 검증
npm run pre-deploy
\`\`\`

## 🔧 확장 기능

### 데이터베이스 추가 (Prisma)

\`\`\`bash
npm install prisma @prisma/client
npx prisma init
\`\`\`

### 인증 추가 (NextAuth.js)

\`\`\`bash
npm install next-auth
\`\`\`

### 애니메이션 추가 (Framer Motion)

\`\`\`bash
npm install framer-motion
\`\`\`

## 📄 라이선스

MIT License

## 🤝 기여

기여는 언제나 환영합니다! 이슈나 PR을 자유롭게 제출해주세요.

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해주세요.

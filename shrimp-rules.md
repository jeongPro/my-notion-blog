# Development Guidelines

> AI Agent 전용 프로젝트 개발 규칙 문서

---

## 프로젝트 개요

### 기본 정보

- **프로젝트명**: Notion CMS 블로그
- **목적**: Notion을 CMS로 활용한 개인 개발 블로그
- **핵심 문서**: `docs/PRD.md` (요구사항), `docs/ROADMAP.md` (개발 계획)

### 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | shadcn/ui | - |
| CMS | @notionhq/client | 5.7.x |
| State | zustand | 5.x |
| Icons | lucide-react | 0.468.x |

---

## 디렉토리 구조

### 필수 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃 (Header/Footer 포함)
│   ├── page.tsx           # 홈 페이지
│   ├── not-found.tsx      # 404 페이지
│   ├── globals.css        # 전역 스타일 + CSS 변수
│   ├── posts/[slug]/      # 글 상세 동적 라우트
│   └── category/[category]/ # 카테고리 동적 라우트
├── components/
│   ├── layout/            # Header, Footer 등 레이아웃
│   ├── posts/             # PostCard, PostList, PostContent
│   └── ui/                # shadcn/ui 컴포넌트만 배치
├── lib/
│   ├── notion.ts          # Notion API 유틸리티 (유일한 API 호출 위치)
│   └── utils.ts           # cn() 등 공통 유틸리티
└── types/
    └── index.ts           # 전역 타입 정의
```

### 파일 배치 규칙

| 파일 유형 | 배치 위치 | 비고 |
|-----------|-----------|------|
| 페이지 컴포넌트 | `app/***/page.tsx` | App Router 규칙 |
| 레이아웃 | `app/***/layout.tsx` | 중첩 레이아웃 가능 |
| UI 컴포넌트 | `components/ui/` | shadcn/ui 전용 |
| 기능 컴포넌트 | `components/{기능명}/` | posts, layout 등 |
| API 유틸리티 | `lib/` | notion.ts, utils.ts |
| 타입 정의 | `types/index.ts` | 전역 타입만 |

---

## 컴포넌트 작성 규칙

### Server Components (기본)

```typescript
// 올바른 예시 - async 함수형 컴포넌트
/**
 * 컴포넌트 설명 (한국어)
 */
export async function ComponentName() {
  const data = await fetchData()
  return <div>{/* JSX */}</div>
}
```

### Client Components

```typescript
// 'use client' 지시문 필수
'use client'

import { useState } from 'react'

interface ComponentProps {
  prop1: string
  prop2?: number
}

/**
 * 컴포넌트 설명 (한국어)
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState()
  return <div>{/* JSX */}</div>
}
```

### 규칙 요약

- **Server Components**: `async function` 사용, 데이터 페칭 직접 수행
- **Client Components**: 파일 최상단에 `'use client'` 선언 필수
- **Props 인터페이스**: 컴포넌트 바로 위에 `interface {Name}Props` 형태로 정의
- **JSDoc 주석**: 모든 export 함수에 한국어 설명 필수
- **import 순서**: React → 외부 라이브러리 → `@/` 경로 순

---

## Notion API 규칙

### API 호출 위치

- **유일한 호출 위치**: `src/lib/notion.ts`
- 다른 파일에서 직접 `@notionhq/client` import 금지

### 기존 함수 목록

| 함수명 | 용도 | 반환값 |
|--------|------|--------|
| `getPosts()` | 발행된 글 목록 조회 | `Post[]` |
| `getPostBySlug(slug)` | slug로 글 조회 | `Post \| null` |
| `getPostsByCategory(category)` | 카테고리별 글 조회 | `Post[]` |
| `getCategories()` | 카테고리 목록 조회 | `string[]` |
| `getPageContent(pageId)` | 페이지 블록 조회 | `Block[]` |

### 새 함수 추가 시 패턴

```typescript
/**
 * 함수 설명 (한국어)
 * @param paramName 파라미터 설명
 * @returns 반환값 설명
 */
export async function newFunction(param: Type): Promise<ReturnType> {
  try {
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID가 설정되지 않았습니다.')
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      // 쿼리 조건
    })

    return response.results.map((page: any) => {
      // 데이터 변환
    })
  } catch (error) {
    console.error('Error message:', error)
    return [] // 또는 null
  }
}
```

---

## 타입 정의 규칙

### 전역 타입 (`types/index.ts`)

```typescript
// 도메인 모델 타입
export interface Post {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  publishedAt: string
  status: '초안' | '발행됨'
  excerpt?: string
}

export interface Block {
  id: string
  type: string
  content: Record<string, unknown>
  children?: Block[]
}
```

### 타입 수정 시 연쇄 확인

| 타입 | 영향받는 파일 |
|------|---------------|
| `Post` | PostCard.tsx, PostList.tsx, notion.ts, page.tsx (홈, 상세, 카테고리) |
| `Block` | PostContent.tsx, notion.ts |
| `Category` | Header.tsx |

---

## 스타일링 규칙

### Tailwind CSS 사용

```tsx
// 올바른 예시 - 유틸리티 클래스 조합
<div className="container mx-auto px-4 py-12">
  <h1 className="mb-4 text-5xl font-bold tracking-tight">
    제목
  </h1>
</div>
```

### 조건부 스타일링

```tsx
import { cn } from '@/lib/utils'

// cn() 함수 사용
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-class"
)}>
```

### shadcn/ui 컴포넌트 사용

```tsx
// components/ui/에서 import
import { Button } from '@/components/ui/button'

// 변형(variant) 활용
<Button variant="outline" size="sm">
  버튼
</Button>
```

### CSS 변수 (globals.css)

- 색상: `--background`, `--foreground`, `--primary`, `--muted` 등
- 모든 색상은 `hsl(var(--color-name))` 형태로 참조
- 다크 모드: `.dark` 클래스에서 변수 오버라이드

---

## 환경 변수 규칙

### 필수 변수

| 변수명 | 용도 | 예시 |
|--------|------|------|
| `NOTION_API_KEY` | Notion Integration 토큰 | `secret_xxx...` |
| `NOTION_DATABASE_ID` | 블로그 DB ID | `abc123...` |

### 설정 방법

1. `.env.local.example` 참조하여 `.env.local` 생성
2. Notion Integration 생성 후 API 키 발급
3. 데이터베이스에 Integration 연결 (Share)

### 접근 규칙

- **서버에서만 접근**: `process.env.NOTION_API_KEY`
- **클라이언트 노출 필요 시**: `NEXT_PUBLIC_` 접두사 사용 (현재 필요 없음)

---

## 파일 연동 규칙

### 수정 시 연쇄 확인 필수

| 수정 파일 | 함께 확인해야 할 파일 |
|-----------|----------------------|
| `types/index.ts` | notion.ts, 모든 컴포넌트 |
| `lib/notion.ts` | 모든 page.tsx, Header.tsx |
| `components/posts/PostCard.tsx` | PostList.tsx |
| `app/layout.tsx` | Header.tsx, Footer.tsx |
| `globals.css` | tailwind.config.ts |

### Notion 데이터베이스 속성 변경 시

1. `lib/notion.ts`의 `NotionPage` 인터페이스 수정
2. `types/index.ts`의 `Post` 인터페이스 수정
3. 관련 컴포넌트 props 및 렌더링 로직 수정

---

## 금지 사항

### 절대 금지

- **환경 변수 하드코딩** - API 키, 데이터베이스 ID 등
- **클라이언트에서 Notion API 직접 호출** - 반드시 Server Components에서만
- **ui/ 폴더에 커스텀 컴포넌트 추가** - shadcn/ui 컴포넌트 전용
- **any 타입 무분별 사용** - 불가피한 경우 eslint-disable 주석과 함께
- **.env.local 파일 커밋** - .gitignore 확인

### 권장하지 않음

- 인라인 스타일 사용 (Tailwind 클래스 우선)
- 직접 DOM 조작 (React 방식 사용)
- 불필요한 Client Components 사용 (Server Components 우선)
- 중첩된 삼항 연산자 (명시적 조건문 사용)

---

## AI 의사결정 기준

### 새 기능 추가 시

1. `docs/PRD.md` MVP 범위 확인
2. `docs/ROADMAP.md` 현재 Phase 확인
3. 기존 컴포넌트/함수 재사용 가능 여부 확인
4. 타입 정의 선행 후 구현

### 버그 수정 시

1. 에러 메시지 및 스택 트레이스 분석
2. 관련 타입 정의 확인
3. Notion API 응답 구조 확인 (필요 시)
4. 최소 범위 수정 원칙

### 불확실한 상황

1. PRD/ROADMAP에 명시되지 않은 기능 → 구현 보류, 확인 요청
2. 여러 구현 방식 가능 → 기존 코드 패턴 따르기
3. 성능 vs 가독성 트레이드오프 → 가독성 우선

---

## 커밋 및 코드 스타일

### 커밋 메시지 (한국어)

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
style: 스타일 수정 (기능 변경 없음)
docs: 문서 수정
```

### 코드 포맷팅

- Prettier 자동 포맷팅 적용 (저장 시)
- 세미콜론 없음 (`"semi": false`)
- 싱글 쿼트 (`"singleQuote": true`)
- 탭 너비 2칸 (`"tabWidth": 2`)
- 후행 쉼표 ES5 (`"trailingComma": "es5"`)

### ESLint 규칙

- `@typescript-eslint/no-unused-vars`: warn (언더스코어 접두사 허용)
- `next/core-web-vitals` 확장

---

## 참고 문서

- **PRD**: `docs/PRD.md` - 전체 요구사항 및 화면 구성
- **ROADMAP**: `docs/ROADMAP.md` - 개발 단계 및 우선순위
- **Next.js 15**: App Router, Server Components
- **shadcn/ui**: `components.json` 설정 참조
- **Notion API**: `lib/notion.ts` 구현 참조

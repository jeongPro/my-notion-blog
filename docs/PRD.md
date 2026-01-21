# PRD: 개인 개발 블로그

## 1. 프로젝트 개요

### 1.1 프로젝트명
개인 개발 블로그 (Notion CMS 기반)

### 1.2 목적
Notion을 CMS(Content Management System)로 활용한 개인 기술 블로그를 구축한다. Notion에서 글을 작성하면 자동으로 블로그에 반영되어, 별도의 관리 페이지 없이도 콘텐츠를 관리할 수 있다.

### 1.3 CMS로 Notion을 선택한 이유
- **익숙한 편집 환경**: Notion의 직관적인 에디터로 콘텐츠 작성
- **실시간 반영**: Notion에서 수정하면 블로그에 자동 반영
- **별도 관리 페이지 불필요**: Notion이 관리자 패널 역할 수행
- **풍부한 콘텐츠 지원**: 코드 블록, 이미지, 테이블 등 다양한 요소 지원
- **무료 사용 가능**: Notion API 무료 제공

---

## 2. 기술 스택

| 구분 | 기술 | 버전/설명 |
|------|------|-----------|
| **Frontend** | Next.js | 15 (App Router) |
| **Language** | TypeScript | 타입 안정성 확보 |
| **CMS** | Notion API | @notionhq/client |
| **Styling** | Tailwind CSS | 유틸리티 기반 스타일링 |
| **UI Components** | shadcn/ui | 재사용 가능한 컴포넌트 |
| **Icons** | Lucide React | 아이콘 라이브러리 |
| **Deployment** | Vercel | Next.js 최적화 배포 |

---

## 3. 주요 기능

### 3.1 글 목록 조회
- Notion 데이터베이스에서 발행된 글 목록 가져오기
- 최신순 정렬
- 페이지네이션 또는 무한 스크롤

### 3.2 글 상세 페이지
- 개별 글의 전체 내용 표시
- Notion 블록을 HTML로 렌더링
- 코드 블록 하이라이팅
- 이미지, 테이블 등 다양한 블록 지원

### 3.3 카테고리별 필터링
- 카테고리 목록 표시
- 선택한 카테고리의 글만 필터링

### 3.4 검색 기능
- 제목 기반 검색
- 실시간 검색 결과 표시

### 3.5 반응형 디자인
- 모바일, 태블릿, 데스크톱 대응
- 모바일 우선 접근법 적용

---

## 4. Notion 데이터베이스 구조

### 4.1 속성(Properties) 정의

| 속성명 | 타입 | 설명 | 필수 |
|--------|------|------|------|
| **Title** | title | 글 제목 | O |
| **Category** | select | 카테고리 (예: Frontend, Backend, DevOps) | O |
| **Tags** | multi_select | 태그 목록 (예: React, TypeScript, Tutorial) | X |
| **Published** | date | 발행일 | O |
| **Status** | select | 상태 (초안/발행됨) | O |
| **Content** | page content | 본문 내용 (Notion 페이지 블록) | O |

### 4.2 Status 옵션
- `초안`: 작성 중인 글 (블로그에 표시되지 않음)
- `발행됨`: 발행된 글 (블로그에 표시됨)

### 4.3 예시 카테고리
- Frontend
- Backend
- DevOps
- Database
- Career
- Review

---

## 5. 화면 구성

### 5.1 홈 페이지 (`/`)
```
┌─────────────────────────────────────────────┐
│  헤더 (로고, 네비게이션)                      │
├─────────────────────────────────────────────┤
│  히어로 섹션 (블로그 소개)                    │
├─────────────────────────────────────────────┤
│  검색 바                                     │
├─────────────────────────────────────────────┤
│  최근 글 목록                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ 카드 1  │ │ 카드 2  │ │ 카드 3  │       │
│  └─────────┘ └─────────┘ └─────────┘       │
├─────────────────────────────────────────────┤
│  푸터                                        │
└─────────────────────────────────────────────┘
```

**표시 정보:**
- 글 제목
- 카테고리
- 발행일
- 태그 (선택적)
- 미리보기 텍스트

### 5.2 글 상세 페이지 (`/posts/[slug]`)
```
┌─────────────────────────────────────────────┐
│  헤더                                        │
├─────────────────────────────────────────────┤
│  글 제목                                     │
│  카테고리 | 발행일                           │
│  태그 목록                                   │
├─────────────────────────────────────────────┤
│  본문 내용                                   │
│  - 텍스트                                   │
│  - 코드 블록                                │
│  - 이미지                                   │
│  - 리스트                                   │
│  - 인용문                                   │
├─────────────────────────────────────────────┤
│  이전/다음 글 네비게이션                     │
├─────────────────────────────────────────────┤
│  푸터                                        │
└─────────────────────────────────────────────┘
```

### 5.3 카테고리 페이지 (`/category/[category]`)
```
┌─────────────────────────────────────────────┐
│  헤더                                        │
├─────────────────────────────────────────────┤
│  카테고리명: {category}                      │
├─────────────────────────────────────────────┤
│  해당 카테고리 글 목록                       │
├─────────────────────────────────────────────┤
│  푸터                                        │
└─────────────────────────────────────────────┘
```

---

## 6. API 설계

### 6.1 Notion API 연동

```typescript
// lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;
```

### 6.2 주요 함수

| 함수명 | 설명 | 반환값 |
|--------|------|--------|
| `getPosts()` | 발행된 글 목록 조회 | Post[] |
| `getPostBySlug(slug)` | 특정 글 조회 | Post |
| `getPostsByCategory(category)` | 카테고리별 글 조회 | Post[] |
| `getCategories()` | 카테고리 목록 조회 | string[] |
| `getPageContent(pageId)` | 페이지 블록 내용 조회 | Block[] |

### 6.3 데이터 타입

```typescript
interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  publishedAt: string;
  status: '초안' | '발행됨';
}

interface Block {
  id: string;
  type: string;
  content: any;
}
```

---

## 7. MVP 범위

### 7.1 포함 기능 (MVP)
- [x] Notion API 연동
- [x] 글 목록 페이지
- [x] 글 상세 페이지
- [x] 카테고리별 필터링
- [x] 기본 스타일링 (Tailwind CSS)
- [x] 반응형 디자인
- [x] SEO 메타 태그

### 7.2 추후 개발 (Post-MVP)
- [ ] 검색 기능
- [ ] 다크 모드
- [ ] 댓글 기능 (giscus 등)
- [ ] 목차(TOC) 자동 생성
- [ ] RSS 피드
- [ ] 조회수 통계
- [ ] 관련 글 추천

---

## 8. 구현 단계

### Phase 1: 프로젝트 초기 설정
1. Next.js 15 프로젝트 생성
2. TypeScript 설정
3. Tailwind CSS 설정
4. shadcn/ui 설정
5. 폴더 구조 정의

### Phase 2: Notion API 연동
1. @notionhq/client 패키지 설치
2. 환경 변수 설정 (.env.local)
3. Notion Integration 생성 및 API 키 발급
4. Notion 데이터베이스 생성 및 연결
5. API 연동 유틸리티 함수 구현

### Phase 3: 페이지 구현
1. 레이아웃 컴포넌트 (Header, Footer)
2. 홈 페이지 - 글 목록
3. 글 상세 페이지
4. 카테고리 페이지
5. 404 페이지

### Phase 4: Notion 블록 렌더링
1. 텍스트 블록 렌더링
2. 코드 블록 렌더링 (하이라이팅)
3. 이미지 블록 렌더링
4. 리스트 블록 렌더링
5. 기타 블록 타입 지원

### Phase 5: 스타일링 및 최적화
1. 전체 UI 스타일링
2. 반응형 디자인 적용
3. 이미지 최적화 (Next.js Image)
4. 캐싱 전략 적용
5. SEO 최적화

### Phase 6: 배포
1. Vercel 프로젝트 연결
2. 환경 변수 설정
3. 배포 및 테스트
4. 도메인 연결 (선택)

---

## 9. 환경 변수

```env
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 10. 폴더 구조

```
notion-cms-project/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈 페이지
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx    # 글 상세 페이지
│   └── category/
│       └── [category]/
│           └── page.tsx    # 카테고리 페이지
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── posts/
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   └── PostContent.tsx
│   └── ui/                 # shadcn/ui 컴포넌트
├── lib/
│   ├── notion.ts           # Notion API 유틸리티
│   └── utils.ts            # 공통 유틸리티
├── types/
│   └── index.ts            # 타입 정의
├── styles/
│   └── globals.css         # 전역 스타일
├── docs/
│   └── PRD.md              # 본 문서
├── .env.local              # 환경 변수 (git 제외)
├── .env.example            # 환경 변수 예시
└── README.md               # 프로젝트 설명
```

---

## 11. 성공 지표

| 지표 | 목표 |
|------|------|
| 페이지 로딩 속도 | LCP < 2.5초 |
| 모바일 호환성 | 완전 반응형 |
| SEO 점수 | Lighthouse 90점 이상 |
| 빌드 성공률 | 100% |

---

## 12. 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 문서](https://nextjs.org/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Vercel 배포 가이드](https://vercel.com/docs)

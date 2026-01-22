# Notion CMS 블로그

Notion을 CMS로 활용한 개인 개발 블로그입니다. Notion에서 글을 작성하면 자동으로 블로그에 반영됩니다.

## 주요 기능

- Notion을 CMS로 사용하여 별도 관리자 페이지 불필요
- Notion의 직관적인 에디터로 콘텐츠 작성
- 실시간 반영 (Notion에서 수정 시 자동 업데이트)
- 카테고리별 글 분류
- 태그 시스템
- 반응형 디자인 (모바일/태블릿/데스크톱 지원)
- SEO 최적화

## 기술 스택

| 구분 | 기술 | 설명 |
|------|------|------|
| **Frontend** | Next.js 15 | App Router 사용 |
| **Language** | TypeScript | 타입 안정성 확보 |
| **CMS** | Notion API | @notionhq/client |
| **Styling** | Tailwind CSS | 유틸리티 기반 스타일링 |
| **UI** | shadcn/ui | 재사용 가능한 컴포넌트 |
| **Icons** | Lucide React | 아이콘 라이브러리 |
| **Deployment** | Vercel | Next.js 최적화 배포 |

## 시작하기

### 1. 프로젝트 설치

\`\`\`bash
# 의존성 설치
npm install
\`\`\`

### 2. Notion 설정

#### 2.1 Notion Integration 생성
1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지 접속
2. "New integration" 클릭
3. Integration 이름 입력 (예: "개발 블로그")
4. "Submit" 클릭
5. "Internal Integration Token" 복사 (이것이 NOTION_API_KEY)

#### 2.2 Notion 데이터베이스 생성
1. Notion에서 새 페이지 생성
2. Database - Table view 선택
3. 다음 속성(Properties) 추가:
   - **Title** (title) - 글 제목
   - **Category** (select) - 카테고리
   - **Tags** (multi_select) - 태그
   - **Published** (date) - 발행일
   - **Status** (select) - 상태 (초안/발행됨)

4. Status 속성 옵션 추가:
   - 초안
   - 발행됨

5. 데이터베이스 우측 상단 "Share" 클릭
6. 생성한 Integration 추가
7. 데이터베이스 URL에서 ID 복사:
   \`https://notion.so/myworkspace/DATABASE_ID?v=...\`

### 3. 환경 변수 설정

\`\`\`bash
# .env.local 파일 생성
cp .env.local.example .env.local
\`\`\`

\`.env.local\` 파일에 다음 값 입력:

\`\`\`env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

### 4. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 프로젝트 구조

\`\`\`
notion-cms-project/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   ├── page.tsx             # 홈 페이지 (글 목록)
│   │   ├── posts/[slug]/        # 글 상세 페이지
│   │   │   └── page.tsx
│   │   ├── category/[category]/ # 카테고리 페이지
│   │   │   └── page.tsx
│   │   ├── not-found.tsx        # 404 페이지
│   │   └── globals.css          # 전역 스타일
│   ├── components/
│   │   ├── layout/              # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx       # 헤더
│   │   │   └── Footer.tsx       # 푸터
│   │   ├── posts/               # 게시글 컴포넌트
│   │   │   ├── PostCard.tsx     # 게시글 카드
│   │   │   ├── PostList.tsx     # 게시글 목록
│   │   │   └── PostContent.tsx  # 게시글 본문 렌더링
│   │   └── ui/                  # shadcn/ui 컴포넌트
│   ├── lib/
│   │   ├── notion.ts            # Notion API 유틸리티
│   │   └── utils.ts             # 공통 유틸리티
│   └── types/
│       └── index.ts             # 타입 정의
├── docs/
│   └── PRD.md                   # 프로젝트 요구사항 문서
├── .env.local.example           # 환경 변수 템플릿
└── README.md                    # 본 문서
\`\`\`

## 페이지 구성

### 홈 페이지 (`/`)
- 최신 글 목록 표시
- 카드 형태로 글 미리보기
- 카테고리, 날짜, 태그 표시

### 글 상세 페이지 (`/posts/[slug]`)
- Notion 블록을 HTML로 렌더링
- 제목, 카테고리, 날짜, 태그 표시
- 코드 블록 하이라이팅
- 이미지, 테이블 등 다양한 블록 지원

### 카테고리 페이지 (`/category/[category]`)
- 특정 카테고리의 글 목록
- 카테고리별 필터링

## Notion 블록 지원 현황

현재 지원하는 블록 타입:
- Paragraph (문단)
- Heading 1, 2, 3 (제목)
- Bulleted List (불릿 리스트)
- Numbered List (번호 리스트)
- Code (코드 블록)
- Quote (인용문)
- Divider (구분선)
- Image (이미지)

## 사용 가능한 스크립트

\`\`\`bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 체크
npm run format       # Prettier 포맷팅
npm run check        # 타입 체크 + Lint
\`\`\`

## 배포

### Vercel 배포 (권장)

1. GitHub에 프로젝트 푸시
2. [Vercel Dashboard](https://vercel.com) 접속
3. "Import Project" 클릭
4. GitHub 저장소 선택
5. Environment Variables 추가:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
6. Deploy 클릭

## 커스터마이징

### UI 색상 변경
\`src/app/globals.css\`에서 CSS 변수 수정:

\`\`\`css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
\`\`\`

### shadcn/ui 컴포넌트 추가

\`\`\`bash
npx shadcn@latest add [component-name]
\`\`\`

## 문제 해결

### Notion API 연결 오류
- Notion Integration이 데이터베이스에 연결되었는지 확인
- API 키가 올바른지 확인
- 데이터베이스 ID가 올바른지 확인

### 빌드 오류
- \`npm run clean\` 후 재빌드
- \`npm run type-check\`로 타입 오류 확인

## 향후 개발 계획

- [ ] 검색 기능
- [ ] 다크 모드
- [ ] 댓글 기능 (giscus)
- [ ] 목차(TOC) 자동 생성
- [ ] RSS 피드
- [ ] 조회수 통계
- [ ] 관련 글 추천

## 라이선스

MIT License

## 문의

이슈나 질문이 있으시면 GitHub Issues를 통해 문의해주세요.

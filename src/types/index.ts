// Notion CMS 블로그 타입 정의

/**
 * 블로그 게시글 인터페이스
 */
export interface Post {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  publishedAt: string
  status: '초안' | '발행됨'
  excerpt?: string // 미리보기 텍스트 (선택적)
}

/**
 * Notion 블록 인터페이스
 */
export interface Block {
  id: string
  type: string
  content: Record<string, unknown>
  children?: Block[]
}

/**
 * 카테고리 인터페이스
 */
export interface Category {
  name: string
  count: number
}

/**
 * Notion 페이지 속성 타입
 */
export interface NotionPageProperties {
  title: string
  category: string
  tags: string[]
  publishedAt: string
  status: '초안' | '발행됨'
}

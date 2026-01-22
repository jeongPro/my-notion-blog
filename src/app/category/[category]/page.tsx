import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, getCategories } from '@/lib/notion'
import { PostList } from '@/components/posts/PostList'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

/**
 * 동적 메타데이터 생성
 */
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return {
    title: `${decodedCategory} | 개발 블로그`,
    description: `${decodedCategory} 카테고리의 글 목록`,
  }
}

/**
 * 정적 경로 생성 (빌드 시 미리 생성)
 */
export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

/**
 * 카테고리 페이지
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  // 해당 카테고리의 글 목록 가져오기
  const posts = await getPostsByCategory(decodedCategory)

  // 카테고리가 존재하지 않으면 404
  if (posts.length === 0) {
    const allCategories = await getCategories()
    if (!allCategories.includes(decodedCategory)) {
      notFound()
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 카테고리 헤더 */}
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {decodedCategory}
        </h1>
        <p className="text-lg text-muted-foreground">
          {posts.length}개의 글
        </p>
      </header>

      {/* 글 목록 */}
      <section>
        <PostList
          posts={posts}
          emptyMessage={`${decodedCategory} 카테고리에 글이 없습니다.`}
        />
      </section>
    </div>
  )
}

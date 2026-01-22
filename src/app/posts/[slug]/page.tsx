import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPosts, getPostBySlug, getPageContent } from '@/lib/notion'
import { PostContent } from '@/components/posts/PostContent'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * 동적 메타데이터 생성
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: '글을 찾을 수 없습니다',
    }
  }

  return {
    title: `${post.title} | 개발 블로그`,
    description: post.excerpt || post.title,
  }
}

/**
 * 정적 경로 생성 (빌드 시 미리 생성)
 */
export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

/**
 * 글 상세 페이지
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  // 게시글이 없으면 404 페이지 표시
  if (!post) {
    notFound()
  }

  // Notion 페이지 블록 콘텐츠 가져오기
  const blocks = await getPageContent(post.id)

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="mx-auto max-w-4xl">
        {/* 글 헤더 */}
        <header className="mb-12 border-b pb-8">
          {/* 카테고리 및 날짜 */}
          <div className="mb-4 flex items-center gap-3 text-sm">
            <span className="rounded-full bg-primary/10 px-4 py-1.5 font-medium text-primary">
              {post.category}
            </span>
            <span className="text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* 제목 */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>

          {/* 태그 목록 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 글 본문 */}
        <PostContent blocks={blocks} />
      </article>
    </div>
  )
}

import { getPosts } from '@/lib/notion'
import { PostList } from '@/components/posts/PostList'

/**
 * 홈 페이지 (글 목록)
 */
export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 히어로 섹션 */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          개발 블로그
        </h1>
        <p className="text-xl text-muted-foreground">
          Notion CMS 기반 개인 기술 블로그
        </p>
      </section>

      {/* 글 목록 */}
      <section>
        <h2 className="mb-8 text-3xl font-bold">최근 글</h2>
        <PostList posts={posts} />
      </section>
    </div>
  )
}

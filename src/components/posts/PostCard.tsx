import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

/**
 * 게시글 카드 컴포넌트
 * 홈 페이지 및 카테고리 페이지에서 사용
 */
export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="group h-full rounded-lg border bg-card p-6 transition-all hover:shadow-md">
        {/* 카테고리 및 날짜 */}
        <div className="mb-3 flex items-center gap-2 text-sm">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
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
        <h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {/* 미리보기 텍스트 */}
        {post.excerpt && (
          <p className="mb-3 line-clamp-2 text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        {/* 태그 목록 */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}

import { PostCard } from './PostCard'
import type { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  emptyMessage?: string
}

/**
 * 게시글 목록 컴포넌트
 * 게시글 배열을 받아 그리드 형태로 렌더링
 */
export function PostList({ posts, emptyMessage }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">
          {emptyMessage || '아직 발행된 글이 없습니다.'}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Notion 데이터베이스에 글을 추가하고 Status를 &quot;발행됨&quot;으로
          설정하세요.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

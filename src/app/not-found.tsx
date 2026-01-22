import Link from 'next/link'

/**
 * 404 페이지
 * 존재하지 않는 경로에 접근했을 때 표시됨
 */
export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-8 text-2xl font-semibold text-muted-foreground">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="mb-8 text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="rounded-md bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}

import Link from 'next/link'
import { getCategories } from '@/lib/notion'

/**
 * 블로그 헤더 컴포넌트
 */
export async function Header() {
  const categories = await getCategories()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            개발 블로그
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              홈
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

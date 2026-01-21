import Link from 'next/link'
import { FileText, LayoutGrid, Database, Code } from 'lucide-react'

export default function ExamplesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-4xl font-bold">예제 페이지</h1>
        <p className="text-lg text-muted-foreground">
          다양한 기능과 컴포넌트 사용 예제를 확인하세요
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExampleCard
          icon={<FileText className="h-8 w-8" />}
          title="폼 예제"
          description="React Hook Form과 Zod를 사용한 폼 유효성 검증"
          href="/examples/forms"
        />
        <ExampleCard
          icon={<LayoutGrid className="h-8 w-8" />}
          title="UI 컴포넌트"
          description="shadcn/ui 컴포넌트 갤러리 및 사용 예제"
          href="/examples/ui-components"
        />
        <ExampleCard
          icon={<Database className="h-8 w-8" />}
          title="데이터 페칭"
          description="React Query를 사용한 서버 데이터 관리"
          href="/examples/data-fetching"
        />
        <ExampleCard
          icon={<Code className="h-8 w-8" />}
          title="API 라우트"
          description="Next.js API Routes 사용 예제"
          href="/api/hello"
          external
        />
      </div>
    </div>
  )
}

function ExampleCard({
  icon,
  title,
  description,
  href,
  external = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  external?: boolean
}) {
  return (
    <Link href={href} target={external ? '_blank' : undefined}>
      <div className="group h-full rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}

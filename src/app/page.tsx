import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Palette, Rocket } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Next.js Starter Kit
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            빠른 프로토타이핑과 프로덕션 배포를 위한 최적화된 스타터 킷
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/examples">
                예제 보기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/examples/ui-components">UI 컴포넌트</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">주요 기능</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Rocket className="h-10 w-10" />}
                title="빠른 개발"
                description="Next.js 15, TypeScript, Tailwind CSS로 빠르게 프로토타입 제작"
              />
              <FeatureCard
                icon={<Palette className="h-10 w-10" />}
                title="커스터마이징"
                description="shadcn/ui 컴포넌트를 자유롭게 수정하고 스타일 변경"
              />
              <FeatureCard
                icon={<Code2 className="h-10 w-10" />}
                title="확장 가능"
                description="API Routes, 데이터베이스, 인증 시스템 쉽게 추가"
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">기술 스택</h2>
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <TechItem label="Next.js 15" description="App Router" />
                <TechItem label="TypeScript" description="타입 안정성" />
                <TechItem label="Tailwind CSS" description="유틸리티 CSS" />
                <TechItem label="shadcn/ui" description="컴포넌트 라이브러리" />
                <TechItem label="Zustand" description="상태 관리" />
                <TechItem label="React Query" description="데이터 페칭" />
                <TechItem
                  label="React Hook Form"
                  description="폼 관리 + Zod"
                />
                <TechItem label="next-themes" description="다크 모드" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Next.js Starter Kit - 프로토타이핑을 위한 최적의 시작점</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 inline-flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function TechItem({
  label,
  description,
}: {
  label: string
  description: string
}) {
  return (
    <div className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent">
      <div className="font-semibold">{label}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Code2 } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Code2 className="h-6 w-6" />
          <span>Starter Kit</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            홈
          </Link>
          <Link
            href="/examples"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            예제
          </Link>
          <Link
            href="/examples/forms"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            폼
          </Link>
          <Link
            href="/examples/ui-components"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            UI 컴포넌트
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

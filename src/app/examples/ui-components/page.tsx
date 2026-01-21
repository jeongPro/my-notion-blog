import { Button } from '@/components/ui/button'
import { Download, Mail, Plus, X } from 'lucide-react'

export default function UIComponentsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="mb-4 text-4xl font-bold">UI 컴포넌트 갤러리</h1>
        <p className="text-lg text-muted-foreground">
          shadcn/ui 컴포넌트 사용 예제
        </p>
      </div>

      {/* 버튼 예제 */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">버튼 (Button)</h2>
          <p className="text-sm text-muted-foreground">
            다양한 스타일과 크기의 버튼 컴포넌트
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">기본 스타일</h3>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">크기</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">아이콘 포함</h3>
            <div className="flex flex-wrap gap-3">
              <Button>
                <Mail className="mr-2 h-4 w-4" /> 메일
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> 다운로드
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" /> 삭제
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">비활성화</h3>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 색상 팔레트 */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">색상 팔레트</h2>
          <p className="text-sm text-muted-foreground">
            다크모드를 전환하여 색상 변화를 확인하세요
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ColorSwatch
            name="Background"
            className="bg-background text-foreground"
          />
          <ColorSwatch name="Card" className="bg-card text-card-foreground" />
          <ColorSwatch
            name="Primary"
            className="bg-primary text-primary-foreground"
          />
          <ColorSwatch
            name="Secondary"
            className="bg-secondary text-secondary-foreground"
          />
          <ColorSwatch name="Muted" className="bg-muted text-muted-foreground" />
          <ColorSwatch
            name="Accent"
            className="bg-accent text-accent-foreground"
          />
        </div>
      </section>

      {/* 타이포그래피 */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">타이포그래피</h2>
          <p className="text-sm text-muted-foreground">폰트 스타일 예제</p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <h3 className="text-2xl font-semibold">Heading 3</h3>
          <h4 className="text-xl font-semibold">Heading 4</h4>
          <p className="text-base">
            일반 텍스트입니다. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p className="text-sm text-muted-foreground">
            작은 텍스트 (Muted). Lorem ipsum dolor sit amet.
          </p>
        </div>
      </section>
    </div>
  )
}

function ColorSwatch({
  name,
  className,
}: {
  name: string
  className: string
}) {
  return (
    <div className={`rounded-lg border p-6 ${className}`}>
      <div className="font-semibold">{name}</div>
      <div className="text-sm opacity-75">
        {className.split(' ')[0].replace('bg-', '')}
      </div>
    </div>
  )
}

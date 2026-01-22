import type { Block } from '@/types'

interface PostContentProps {
  blocks: Block[]
}

/**
 * Notion 블록을 HTML로 렌더링하는 컴포넌트
 * MVP 단계에서는 기본적인 블록 타입만 지원
 */
export function PostContent({ blocks }: PostContentProps) {
  if (blocks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">콘텐츠를 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </article>
  )
}

/**
 * 개별 블록을 렌더링하는 컴포넌트
 */
function BlockRenderer({ block }: { block: Block }) {
  const { type, content } = block

  switch (type) {
    case 'paragraph':
      return <Paragraph content={content} />

    case 'heading_1':
      return <Heading1 content={content} />

    case 'heading_2':
      return <Heading2 content={content} />

    case 'heading_3':
      return <Heading3 content={content} />

    case 'bulleted_list_item':
      return <BulletedListItem content={content} />

    case 'numbered_list_item':
      return <NumberedListItem content={content} />

    case 'code':
      return <CodeBlock content={content} />

    case 'quote':
      return <Quote content={content} />

    case 'divider':
      return <hr className="my-8" />

    case 'image':
      return <ImageBlock content={content} />

    default:
      // 지원하지 않는 블록 타입은 JSON으로 표시 (디버깅용)
      return (
        <div className="my-4 rounded-md bg-muted p-4 text-sm">
          <p className="mb-2 font-mono text-muted-foreground">
            미지원 블록 타입: {type}
          </p>
          <pre className="overflow-auto text-xs">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      )
  }
}

/**
 * 텍스트 추출 헬퍼 함수
 */
function extractText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return ''
  return richText.map((text) => text.plain_text).join('')
}

/**
 * 개별 블록 컴포넌트들
 */
function Paragraph({ content }: { content: any }) {
  const text = extractText(content.rich_text)
  if (!text) return null
  return <p>{text}</p>
}

function Heading1({ content }: { content: any }) {
  return <h1>{extractText(content.rich_text)}</h1>
}

function Heading2({ content }: { content: any }) {
  return <h2>{extractText(content.rich_text)}</h2>
}

function Heading3({ content }: { content: any }) {
  return <h3>{extractText(content.rich_text)}</h3>
}

function BulletedListItem({ content }: { content: any }) {
  return (
    <li className="ml-4 list-disc">{extractText(content.rich_text)}</li>
  )
}

function NumberedListItem({ content }: { content: any }) {
  return (
    <li className="ml-4 list-decimal">{extractText(content.rich_text)}</li>
  )
}

function CodeBlock({ content }: { content: any }) {
  const code = extractText(content.rich_text)
  const language = content.language || 'text'

  return (
    <pre className="overflow-auto rounded-md bg-muted p-4">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}

function Quote({ content }: { content: any }) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic">
      {extractText(content.rich_text)}
    </blockquote>
  )
}

function ImageBlock({ content }: { content: any }) {
  const imageUrl =
    content.type === 'external' ? content.external.url : content.file.url
  const caption = content.caption
    ? extractText(content.caption)
    : '이미지'

  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={caption}
        className="rounded-lg"
        loading="lazy"
      />
      {content.caption && content.caption.length > 0 && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

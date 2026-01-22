import { Client } from '@notionhq/client'
import type { Post, Block } from '@/types'

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const databaseId = process.env.NOTION_DATABASE_ID as string

// Notion API 응답 타입 정의
interface NotionPage {
  id: string
  properties: {
    Title: {
      title: Array<{ plain_text: string }>
    }
    Category: {
      select: { name: string } | null
    }
    Tags: {
      multi_select: Array<{ name: string }>
    }
    Published: {
      date: { start: string } | null
    }
    Status: {
      select: { name: string } | null
    }
  }
}

interface NotionBlock {
  id: string
  type: string
  [key: string]: unknown
}

/**
 * 발행된 글 목록 조회
 * @returns 발행된 게시글 목록
 */
export async function getPosts(): Promise<Post[]> {
  try {
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID가 설정되지 않았습니다.')
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: '발행됨',
        },
      },
      sorts: [
        {
          property: 'Published',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((page: any) => {
      const properties = page.properties
      return {
        id: page.id,
        title: properties.Title.title[0]?.plain_text || 'Untitled',
        slug: properties.Title.title[0]?.plain_text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-가-힣]+/g, '') || page.id,
        category: properties.Category.select?.name || 'Uncategorized',
        tags: properties.Tags?.multi_select.map((tag: any) => tag.name) || [],
        publishedAt: properties.Published.date?.start || '',
        status: properties.Status.select?.name as '초안' | '발행됨',
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

/**
 * slug로 특정 글 조회
 * @param slug 게시글 slug
 * @returns 게시글 정보
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getPosts()
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

/**
 * 카테고리별 글 조회
 * @param category 카테고리명
 * @returns 해당 카테고리의 게시글 목록
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID가 설정되지 않았습니다.')
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: '발행됨',
            },
          },
          {
            property: 'Category',
            select: {
              equals: category,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Published',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((page: any) => {
      const properties = page.properties
      return {
        id: page.id,
        title: properties.Title.title[0]?.plain_text || 'Untitled',
        slug: properties.Title.title[0]?.plain_text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-가-힣]+/g, '') || page.id,
        category: properties.Category.select?.name || 'Uncategorized',
        tags: properties.Tags?.multi_select.map((tag: any) => tag.name) || [],
        publishedAt: properties.Published.date?.start || '',
        status: properties.Status.select?.name as '초안' | '발행됨',
      }
    })
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

/**
 * 카테고리 목록 조회
 * @returns 카테고리 목록
 */
export async function getCategories(): Promise<string[]> {
  try {
    const posts = await getPosts()
    const categories = [...new Set(posts.map((post) => post.category))]
    return categories.filter((category) => category !== 'Uncategorized')
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * 페이지 블록 내용 조회
 * @param pageId 페이지 ID
 * @returns 블록 목록
 */
export async function getPageContent(pageId: string): Promise<Block[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    })

    return response.results.map((block: any) => ({
      id: block.id,
      type: block.type,
      content: block[block.type],
    }))
  } catch (error) {
    console.error('Error fetching page content:', error)
    return []
  }
}
